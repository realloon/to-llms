use rayon::prelude::*;
use serde::Serialize;
use std::fs;
use walkdir::WalkDir;

#[derive(Serialize)]
struct ProcessingResult {
    markdown_content: String,
    processed_files_count: usize,
    total_lines_count: usize,
}

#[tauri::command]
fn process_files(root: String) -> Result<ProcessingResult, String> {
    let root_path = std::path::Path::new(&root);

    let paths: Vec<_> = WalkDir::new(root_path)
        .into_iter()
        .filter_map(Result::ok)
        .par_bridge()
        .filter(|entry| {
            let path_str = entry.path().to_string_lossy();
            entry.file_type().is_file()
                && path_str.ends_with(".cs")
                && !path_str.contains("obj")
                && !path_str.contains("bin")
        })
        .map(|entry| entry.path().to_path_buf())
        .collect();

    let contents: Vec<String> = paths
        .par_iter()
        .map(|path| {
            let content = fs::read_to_string(path).unwrap_or_default();
            let relative_path = path.strip_prefix(root_path).unwrap_or(path);
            format!(
                "```csharp\n// {}\n{}\n```",
                relative_path.display(),
                content
            )
        })
        .collect();

    let processed_files_count = paths.len();
    let markdown_content = contents.join("\n\n");
    let total_lines_count = markdown_content.lines().count();

    Ok(ProcessingResult {
        markdown_content,
        processed_files_count,
        total_lines_count,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![process_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
