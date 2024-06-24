<template>
  <div>
    <el-row>
      <el-button-group>
        <el-button size="small"  @click="editor.commands.setFontSize(14);">
          14px
        </el-button>
        <el-button size="small"  @click="editor.commands.setFontSize(15);" >
          15px
        </el-button>
        <el-button size="small"  @click="editor.commands.setFontSize(16);" >
          16px
        </el-button>
        <el-button size="small"  @click="setLink()">
          Link
        </el-button>
      </el-button-group>
    </el-row>
    <el-row class="mb-3">
      <el-button-group>
        <el-button style="color: #fa2828" size="small" @click="editor.chain().focus().setColor('#fa2828').run()">
          가
        </el-button>
        <el-button style="color: #007aff" size="small" @click="editor.chain().focus().setColor('#007aff').run()">
          가
        </el-button>
        <el-button size="small"  @click="editor.commands.toggleMark('bold')" >
          <strong>가</strong>
        </el-button>
        <el-button size="small"  @click="editor.commands.toggleUnderline()">
          <u>가</u>
        </el-button>
        <el-button size="small" @click="clear()">
          clear
        </el-button>
      </el-button-group>
    </el-row>
    <editor-content class="text-[14px]" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import {FontSize} from '../composables/tiptap.js'
import HardBreak from '@tiptap/extension-hard-break'

export default {
  components: {
    EditorContent,
  },
  props:{
    contents:{
      type: String,
      required: false
    },
  },
  data() {
    return {
      editor: null,
      editable: true,
      editContents:""
    }
  },
  mounted() {
    this.editor = new Editor({
      editable: this.editable,
      content: this.editContents ,
      extensions: [
        StarterKit,
        Color,
        TextStyle,
        FontSize,
        Link,
        Underline,
        HardBreak.extend({
          addKeyboardShortcuts () {
            return {
              Enter: () => this.editor.commands.setHardBreak()
            }
          }
        })
      ],
    })
    this.editor.on('update', ({ editor }) => {
      this.$emit('input', editor.getHTML())
    })
  },
  watch:{
    contents: {
      handler(val) {
        this.editContents = val;
        /*this.editor?.commands.setContent(this.editContents);*/
      },
      immediate: true
    },
  },
  methods:{
    dataCheck(){
      console.log(this.editor.getHTML())
    },
    setLink(){
      /*const { from, to } = this.editor.state.selection;
      const text = this.editor.state.doc.textBetween(from, to);
      this.editor.commands.toggleLink({ href: `${text}`, target: '_blank' })*/
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      // cancelled
      if (url === null) {
        return
      }
      // empty
      if (url === '') {
        this.editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
      }
      // update link
      this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
    },
    setFontSize(size){
      this.editor.chain().focus().setMark('textStyle', { class: size });
    },
    clear(){
      this.editor.commands.unsetAllMarks()
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style lang="scss">
.ProseMirror{
  outline: none;
  white-space: pre-line !important;
  background-color: #DEE2E6;
  /*word-wrap: unset !important;*/
  a{
    color: #007aff;
    text-decoration-line: underline;
    display: inline;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>
