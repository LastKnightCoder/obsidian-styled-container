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
        await MarkdownRenderer.renderMarkdown(source, el, '.', null);
        
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
        editorCallback: async (editor: Editor, view: MarkdownView) => {
          const content = editor.getSelection();
          const newContent = `<span class="comments ${color}">${content}</span>`
          editor.replaceSelection(`${newContent}`)
        }
      });
    });
  }
    
  onunload() {

  }
}
