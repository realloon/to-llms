package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"to-llms/internal/csreader"
)

type Config struct {
	Root   string `json:"root"`
	Before string `json:"before"`
	After  string `json:"after"`
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

	codes, err := csreader.ReadAllCsFilesRecursively(root)
	if err != nil {
		log.Fatal(err)
	}

	code := strings.Join(codes, "\n\n")

	result := strings.Join([]string{config.Before, code, config.After}, "\n\n")

	outputDir := "./output"

	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatal(err)
	}

	outputPath := filepath.Join(outputDir, "LLMs.txt")
	err = os.WriteFile(outputPath, []byte(result), 0644)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Done.")
}
