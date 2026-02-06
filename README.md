# cli2pdf 📄

**cli2pdf** is a lightweight Node.js tool that uses **Playwright (Chromium)** to convert web pages into high-fidelity PDFs.

Unlike standard "Print to PDF" functions, this tool is designed to capture **infinite scroll** websites without cutting content or text between pages. It dynamically adjusts the PDF height to fit the entire web page as one continuous strip.

## 🚀 Features

- **No Page Breaks**: Creates a single, continuous PDF file. Perfect for chat logs, documentation, wikis, or long articles.
- **Infinite Scroll Support**: Automatically scrolls to the bottom of the page to trigger lazy-loading images and content before capturing.
- **Visual Fidelity**: Forces "Screen Mode" to capture the site exactly as it looks on a monitor (ignoring print stylesheets that hide content).
- **Full HD Mode**: Optional flag to force a 1920px width rendering.
- **Open Source**: Licensed under GPLv3.

## 📦 Dependencies

This project relies on the following core technologies:

- **Node.js** (Runtime environment)
- **Playwright** (For browser automation)
- **Chromium Browser** (Managed automatically by Playwright)

## 🛠️ Installation

1. **Download and Locate:**
Download the repository (or `git clone` it) and open PowerShell or your terminal inside the `cli2pdf` folder.
```powershell
cd cli2pdf
```

2. **Install dependencies:**
This command installs the required Node.js libraries defined in `package.json`.
```powershell
npm install
```

3. **Install the browser binary:**
This downloads the specific version of Chromium needed for the PDF generation.
```powershell
npx playwright install chromium
```

## 💻 Usage

Run the script using Node.js with the URL you want to capture:

### Standard Mode (Auto-width)

Best for most websites. It adapts to the site's natural width (usually 1280px).

```powershell
node index.js "https://es.wikipedia.org/wiki/Internet"
```

### Full HD Mode (Fixed 1920px)

Forces the browser to render at 1920px width. Useful for wide layouts or preserving desktop fidelity.

Use the flag `--fhd`
```powershell
node index.js "https://es.wikipedia.org/wiki/Internet" --fhd
```

## 📂 Output

The PDF will be generated in the same folder with a timestamped filename, for example:
`Internet_-_Wikipedia_2026-02-06T21-30.pdf`
