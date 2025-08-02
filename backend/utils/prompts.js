export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI assistant that generates interview questions and answers in valid JSON format only.

Instructions:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Number of Questions: ${numberOfQuestions}

Requirements:
1. Output must be a **pure JSON array** without any markdown, code fences, or extra text.
2. Each array item must be an object with:
   - "question": a concise interview question.
   - "answer": a clear, beginner-friendly answer. Include **code examples inside the answer string**, properly indented if necessary.
3. Maintain correct JSON formatting, including escaped characters for newlines (\\n).
4. Do not prepend or append any explanations, notes, or formatting instructions.

Example structure to follow:

[
    {
        "question": "Explain closures in JavaScript.",
        "answer": "A closure is a function that retains access to its outer scope even after the outer function has returned.\\nExample:\\n\\nfunction outer() {\\n  let counter = 0;\\n  return function inner() {\\n    counter++;\\n    console.log(counter);\\n  };\\n}\\n\\nconst fn = outer();\\nfn(); // 1\\nfn(); // 2"
    },
    ...
]

Generate the ${numberOfQuestions} questions and their detailed answers strictly in the above format.
Only output valid JSON.
`;



export const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
    "title": "Short title here?",
    "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`);



export const generateQuizPrompt = (role) => (`
You are an AI trained to generate quiz questions for developers.

Task:
- Based on the topic below, generate a quiz of **10 multiple-choice questions**.
- Topic: "${role}"
- Each question should test conceptual understanding.
- Each question must have 4 distinct options labeled A, B, C, and D.
- Clearly mark the correct answer.
- Keep the difficulty at a beginner to intermediate level.
- Ensure that the questions are not repeated and cover different subtopics if possible.
- Return the result as a **valid JSON array** of objects in the following format:

[
  {
    "question": "Your question here",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "C"
  },
  ...
]

Important: Do NOT add any explanation or extra text outside the JSON format.
Only return a valid JSON array.
`);
