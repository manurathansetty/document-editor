// src/extensions/Callout.ts
import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

const inputRegex = /^\/callout(?:\s+(info|warning))?$/;

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => ({
          "data-type": attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type]",
        contentElement: "div.callout-content",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const type = (node?.attrs?.type as string) ?? "info";
    const baseClass = "border-l-4 p-3 rounded text-black dark:text-gray-800";
    const colorClass =
      type === "warning"
        ? "border-orange-500 bg-orange-100 dark:bg-orange-200"
        : "border-blue-500 bg-blue-100 dark:bg-blue-200";
    const label = type === "warning" ? "Warning" : "Info";
    const emoji = type === "warning" ? "⚠️" : "ℹ️";
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: `${baseClass} ${colorClass}` }),
      [
        "div",
        { class: "mb-2 font-semibold flex items-center gap-2" },
        ["span", { class: "text-lg" }, emoji],
        ["span", {}, label],
      ],
      ["div", { class: "callout-content" }, 0],
    ];
  },

  addCommands(): any {
    return {
      setCallout:
        (type: "info" | "warning" = "info") =>
        ({ editor, chain, commands }: any) => {
          if (editor.isActive(this.name)) {
            return commands.updateAttributes(this.name, { type });
          }
          return chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: { type },
              content: [{ type: "paragraph" }],
            })
            .run();
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, kind] = match as unknown as [string, "info" | "warning" | undefined];
          return { type: kind ?? "info" };
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Shift-Enter": ({ editor }) => {
        const { state, view } = editor;
        const { $from } = state.selection;
        for (let depth = $from.depth; depth > 0; depth--) {
          const node = $from.node(depth);
          if (node.type.name === this.name) {
            const posAfter = $from.after(depth);
            const tr = state.tr.insert(posAfter, state.schema.nodes.paragraph.create());
            const sel = TextSelection.near(tr.doc.resolve(posAfter + 1));
            tr.setSelection(sel);
            view.dispatch(tr.scrollIntoView());
            return true;
          }
        }
        return false;
      },
    };
  },
});


