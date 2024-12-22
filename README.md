# Learnbot <img src="learnbot-logo.png" width="30px">
Learnbot is a simple AI bot that learns entirely from user input. It allows you to teach it new information by entering text, and then it can respond to questions based on what it has learned.

 

## Getting Started
Visit [the Learnbot website](https://supergames-d.github.io/Learnbot) to chat with Learnbot.
Note that this AI is not pre-trained, so you will need to teach it yourself.

### Teaching Learnbot

To teach Learnbot, enter text in the `Teach` box. You should provide multiple sentences with information to help Learnbot understand better. For example:
```
Learnbot is a simple AI bot.
SuperGames- is a developer.
```
### Asking Questions
After teaching Learnbot, you can ask questions such as:
- `Who is SuperGames-D?`
- `What is Learnbot?`

Learnbot will respond using the exact information you provided.

Feel free to experiment with many different prompts!

## Models
As Learnbot has been improved, new models have been created. By default, opening the Learnbot website will load the most recent model. You can specify a different model by adding `?model=` followed by the model name to the URL.
For instance, `?model=v01` will use the first version of Learnbot.

## Advanced features
Learnbot includes several advanced features:
- **Dynamic Learning**: Use the `/learn [text]` command to teach Learnbot new information directly in chat.
- **Basic Math**: Activate math mode using `/learn math`. This allows Learnbot to perform simple calculations (up to 100). For example:
  ```
  Q: What is 2+2?
  A: 2+2 is 4.
  ```
- **Synonym Replacement**: Learnbot replaces certain words with their synonyms to improve variability in responses.
- **Feedback System**: You can like or dislike Learnbot's responses to prioritize or correct certain answers in the `Teach` database.
- **Context awareness**: Words in the database inside square brackets `[ ]` will be used by Learnbot to understand the context but will not appear in the response.

## Contributions
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License  
Learnbot is released under the MIT License. See the [LICENSE](LICENSE) file for details.
