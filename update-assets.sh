#!/bin/bash

# This script updates all micro-frontend project.json files to include shared assets

# Function to add shared assets to a project.json file
add_shared_assets() {
  local file=$1
  echo "Updating $file with shared assets..."
  
  # Create a temporary file
  tmp_file=$(mktemp)
  
  # Use sed to insert the shared assets configuration 
  # This looks for the pattern "input": "<project>/public" and adds the shared assets after it
  sed '/"input": ".*\/public"/a \
          },\
          {\
            "glob": "**/*",\
            "input": "libs/shared-ui/src/assets",\
            "output": "assets/shared"' "$file" > "$tmp_file"
  
  # Replace the original file with the modified one
  mv "$tmp_file" "$file"
  
  echo "Updated $file successfully"
}

# Find all project.json files in micro-frontends
for project_file in mfeBudget/project.json mfeReports/project.json mfeSettings/project.json; do
  if [ -f "$project_file" ]; then
    add_shared_assets "$project_file"
  else
    echo "File $project_file not found, skipping..."
  fi
done

echo "All project files updated with shared assets configuration" 