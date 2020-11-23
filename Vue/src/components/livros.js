import { reactive, readonly, computed } from 'vue'

const bookList = reactive([])

export const livros = readonly(bookList)
export const size = computed(() => bookList.length)

export function createLivro () {
  bookList.push({ statement: '', autor: '', descricao: '', imagem: '' })
}

export function updateLivro (livro, index) {
  bookList[index] = livro
}

export function deleteLivro (index) {
  bookList.splice(index, 1)
}
