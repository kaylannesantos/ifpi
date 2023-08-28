import unittest
from biblioteca import Livro, Artigo


class TestLivro(unittest.TestCase):
    def test_informacoes(self):
        livro = Livro(2, 'A Seleção', 'Kiera Cass', 'Um príncipe, 35 candidatas e apenas uma coroa', 368, 'Romance')
        expected_output = "Livro: A Seleção\nAutor: Kiera Cass\nGênero: Romance"
        self.assertEqual(livro.informacoes(), expected_output)

if __name__ == '__main__':
    unittest.main()

class TestArtigo(unittest.TestCase):
    def test_informacoes(self):
        artigo = Artigo(1, 'Ciência e Comportamento Humano', 'Skinner', '-', 25, 'Ciência, Comportamento')
        expected_output = "Artigo: Ciência e Comportamento Humano\nAutor: Skinner\nPalavras-Chave: Comportamento"
        self.assertEqual(artigo.informacoes(), expected_output)

if __name__ == '__main__':
    unittest.main()
