import { Plugin, MarkdownRenderer, Editor, MarkdownView } from 'obsidian';

export default class MyPlugin extends Plugin {

  async onload() {
    interface Table {
      [propName: string]: string
    }

    const tables: Table = {
      tip: 'Tip',
      info: 'Info',
      warning: 'Warning',
      danger: 'Danger',
      note: 'Note'
    };

    for (let key in tables) {
      this.registerMarkdownCodeBlockProcessor(key, async (source, el, ctx) => {        
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        await MarkdownRenderer.renderMarkdown(source, el, '.', view);
        
        el.addClass('custom-block');
        el.addClass(key);
        const title = createEl('p', {text: tables[key], cls: "custom-block-title"});
        el.insertBefore(title, el.firstChild);
      })
    }

    const colors = ['', 'green', 'red', 'blue', 'purple'];
    colors.forEach(color => {
      this.addCommand({
        id: `Add Comments ${color.toUpperCase()}`,
        name: `Add Comments ${color.toUpperCase()}`,
        callback: () => {
          const editor = this.app.workspace.getActiveViewOfType(MarkdownView).editor;
          const content = editor.getSelection();
          const newContent = `<span class="comments ${color}">${content}</span>`
          editor.replaceSelection(`${newContent}`)
        }
      });
    });

    ['tip', 'note', 'info', 'warning', 'danger'].forEach(item => {
      this.addCommand({
        id: `Add Custom Block ${item.toUpperCase()}`,
        name: `Add Custom Block ${item.toUpperCase()}`,
        callback: () => {
          const editor = this.app.workspace.getActiveViewOfType(MarkdownView).editor;
          const content = editor.getSelection();
          const newContent = `\`\`\`${item}\n${content}\n\`\`\``
          editor.replaceSelection(newContent);
        }
      });
    });
  }
    
  onunload() {

  }
}
