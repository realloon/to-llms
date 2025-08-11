package csreader

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func ReadAllCsFilesRecursively(root string) ([]string, error) {
	var results []string

	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() && strings.HasSuffix(d.Name(), ".cs") {
			content, err := os.ReadFile(path)
			if err != nil {
				log.Printf("%v\n", err)
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
