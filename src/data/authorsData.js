// База даних авторів
const images = import.meta.glob('../assets/authors/*.jpg', { eager: true });

const authors = [
  {
    id: 1,
    name: "Brothers Grimm",
    about: "German scholars best known for collecting folklore, including classic tales like Cinderella and Snow White. They also contributed to linguistics, especially with Grimm's Law.",
    photo: images['../assets/authors/BrothersGrimm.jpg'].default,
  },
  {
    id: 2,
    name: "Charles Dickens",
    about: "An English novelist famous for works like Oliver Twist and A Christmas Carol, highlighting social issues like poverty and injustice in Victorian society.",
    photo: images['../assets/authors/CharlesDickens.jpg'].default,
  },
  {
    id: 3,
    name: "Ernest Hemingway",
    about: "An American novelist known for his minimalist prose and themes of courage and loss. His works, such as The Old Man and the Sea, earned him the Nobel Prize in Literature in 1954.",
    photo: images['../assets/authors/ErnestHemingway.jpg'].default,
  },
  {
    id: 4,
    name: "Franz Kafka",
    about: "A Bohemian writer known for his themes of alienation and existential dread, as seen in works like The Metamorphosis and The Trial.",
    photo: images['../assets/authors/KafkaFsranz.jpg'].default,
  },
  {
    id: 5,
    name: "Friedrich Nietzsche",
    about: "A German philosopher known for challenging traditional morality and religion in works like Thus Spoke Zarathustra. His ideas influenced existentialism and modern philosophy.",
    photo: images['../assets/authors/FriedrichNietzsche.jpg'].default,
  },
  {
    id: 6,
    name: "Govard Lovecraft",
    about: "An American writer famous for his cosmic horror fiction, exploring humanity's insignificance. Works like The Call of Cthulhu influenced the Lovecraftian horror genre.",
    photo: images['../assets/authors/GovardLovecraft.jpg'].default,
  },
  {
    id: 7,
    name: "Honoré de Balzac",
    about: "A French novelist famous for La Comédie Humaine, a series of interconnected stories depicting 19th-century French society.",
    photo: images['../assets/authors/HonoreDeBalzac.jpg'].default,
  },
  {
    id: 8,
    name: "Jack London",
    about: "An American author known for adventure novels like The Call of the Wild, exploring themes of survival and the human-animal connection.",
    photo: images['../assets/authors/JackLondon.jpg'].default,
  },
  {
    id: 9,
    name: "Jules Verne",
    about: "A French novelist and science fiction pioneer, known for adventurous works like Twenty Thousand Leagues Under the Sea and Around the World in Eighty Days.",
    photo: images['../assets/authors/JuleVerne.jpg'].default,
  },
  {
    id: 10,
    name: "Mark Twain",
    about: "An American humorist and writer, best known for The Adventures of Tom Sawyer and Adventures of Huckleberry Finn. He is often called the father of American literature.",
    photo: images['../assets/authors/MarkTwain.jpg'].default,
  },
  {
    id: 11,
    name: "Salvador Dali",
    about: "A Spanish surrealist artist known for dreamlike imagery, such as The Persistence of Memory (1931). Dali was a key figure in the Surrealist movement, blending the absurd with the symbolic.",
    photo: images['../assets/authors/SalvadorDali.jpg'].default,
  },
];

export default authors;

  