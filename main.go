package main

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	Root   string `json:"root"`
	Before string `json:"before"`
	After  string `json:"after"`
}

func readAllCsFiles(root string) ([]string, error) {
	var results []string

	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() && strings.HasSuffix(d.Name(), ".cs") {
			content, err := os.ReadFile(path)
			if err != nil {
				log.Printf("Error reading file: %v", err)
				return nil
			}

			formattedContent := fmt.Sprintf("```cs\n// %s\n%s\n```", filepath.ToSlash(path), string(content))
			results = append(results, formattedContent)
		}

		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("%w", err)
	}

	return results, nil
}

func main() {
	configFile, err := os.ReadFile("config.json")
	if err != nil {
		log.Fatal(err)
	}

	var config Config
	if err := json.Unmarshal(configFile, &config); err != nil {
		log.Fatal(err)
	}

	root, err := filepath.Abs(config.Root)
	if err != nil {
		log.Fatal(err)
	}

	codes, err := readAllCsFiles(root)
	if err != nil {
		log.Fatal(err)
	}

	code := strings.Join(codes, "\n\n")

	result := strings.Join([]string{config.Before, code, config.After}, "\n\n")

	ouputDir := "./output"

	if err := os.MkdirAll(ouputDir, 0755); err != nil {
		log.Fatal(err)
	}

	outputPath := filepath.Join(ouputDir, "LLMs.txt")
	err = os.WriteFile(outputPath, []byte(result), 0644)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Done.")
}
