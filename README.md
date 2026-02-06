# cli2pdf 📄

**cli2pdf** is a lightweight Node.js tool that uses **Mozilla Firefox** (via Playwright) to convert web pages into high-fidelity PDFs. 

Unlike standard "Print to PDF" functions, this tool is designed to capture **infinite scroll** websites without cutting content or text between pages. It dynamically adjusts the PDF height to fit the entire web page as one continuous strip.

## 🚀 Features

- **No Page Breaks**: Creates a single, continuous PDF file. Perfect for chat logs, documentation, or long articles.
- **Infinite Scroll Support**: Automatically scrolls to the bottom of the page to trigger lazy-loading images and content before capturing.
- **Firefox Engine**: Uses a real browser engine for accurate rendering.
- **Open Source**: Licensed under GPLv3 to ensure freedom.

## 📦 Dependencies

This project relies on the following core technologies:

- **Node.js** (Runtime environment)
- **Playwright** (For browser automation)
- **Firefox Browser Binary** (Managed automatically by Playwright)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/0GMou/cli2pdf.git](https://github.com/0GMou/cli2pdf.git)
   cd cli2pdf
