import { ReactElement } from 'react';

// Doesn't support the same keyword in different colours.

interface IHeadline {
    content: string
    keywords?: { [key: string]: string }
}

const getWord = (word: string, whitespace: string): string => (
    `${word}${whitespace}`
);

const Headline = ({ content, keywords = {} }: IHeadline): ReactElement => {
    const words = content.split(' ');

    return (
        <h1 data-testid="headline" className="display-1">
            {words.map((word, i, { length }) => {
                const whitespace = i + 1 === length ? '' : ' ';

                return keywords && word in keywords
                    ? (
                        <span
                            key={i}
                            style={{ background: `${keywords[word]}` }}
                        >
                            {getWord(word, whitespace)}
                        </span>
                    )
                    : getWord(word, whitespace);
            })}
        </h1>
    );
};

export default Headline;
