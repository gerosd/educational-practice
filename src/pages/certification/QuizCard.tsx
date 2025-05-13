import React, { useState } from 'react';
import { QuizTests, quizStorage } from '../../assets/types/quizData';
import checkIcon from '../../assets/complete.svg';

interface QuizProps {
    styles: Record<string, string>;
}

function QuizCard( {styles}: QuizProps ): React.ReactElement {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [answersTracker, setAnswersTracker] = useState<Map<number, number>>(new Map());
    
    const currentQuestion = quizStorage[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizStorage.length) * 100;
    const isLastQuestion = currentQuestionIndex === quizStorage.length - 1;
    const passedThreshold = correctAnswers >= 13;
    
    const handleOptionClick = (optionIndex: number) => {
        const currentCorrectOption = currentQuestion.answer - 1;
        const previousAnswer = answersTracker.get(currentQuestionIndex);
        
        if (selectedAnswer !== null && selectedAnswer !== optionIndex) {
            if (previousAnswer === currentCorrectOption && optionIndex !== currentCorrectOption) {
                setCorrectAnswers(prev => prev - 1);
            } 
            else if (previousAnswer !== currentCorrectOption && optionIndex === currentCorrectOption) {
                setCorrectAnswers(prev => prev + 1);
            }
        } 
        else if (selectedAnswer === null) {
            if (optionIndex === currentCorrectOption) {
                setCorrectAnswers(prev => prev + 1);
            }
        }
        
        setAnswersTracker(prev => new Map(prev).set(currentQuestionIndex, optionIndex));
        setSelectedAnswer(optionIndex);
    };
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizStorage.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizCompleted(true);
            if (correctAnswers >= 13) {
                setShowEmailForm(true);
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            console.log('Certificate request submitted for:', email);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setCorrectAnswers(0);
        setQuizCompleted(false);
        setAnswersTracker(new Map());
    };

    return (
        <div className={styles.quizCard}>
            {!quizCompleted ? (
                <>
                    <h2 className={styles.quizCount}>{currentQuestionIndex + 1} / {quizStorage.length}</h2>
                    <h2 className={styles.quizName}>{currentQuestion.question}</h2>
                    {currentQuestion.code && <pre>{currentQuestion.code}</pre>}
                    <div className={styles.quizOptions}>
                        {currentQuestion.options.map((option, index) => (
                            <div 
                                key={index} 
                                className={`${styles.quizOption} ${selectedAnswer === index ? styles.selected : ''}`}
                                onClick={() => handleOptionClick(index)}
                            >
                                {option}
                                {selectedAnswer === index && (
                                    <img 
                                        src={checkIcon} 
                                        alt="Selected" 
                                        className={styles.checkmark}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    {selectedAnswer !== null && (
                        <button 
                            className={styles.nextButton} 
                            onClick={handleNextQuestion}
                        >
                            {isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'}
                        </button>
                    )}
                    <div className={styles.progressBar}>
                        <div className={styles.progressThumb} style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            ) : (
                showEmailForm ? (
                    submitted ? (
                        <div className={styles.thankYouMessage}>
                            <h3>Спасибо за прохождение теста!</h3>
                            <p>Сертификат будет отправлен на указанный email: {email}</p>
                        </div>
                    ) : (
                        <form className={styles.emailForm} onSubmit={handleSubmit}>
                            <h3>Поздравляем! Вы успешно прошли тест!</h3>
                            <p className={styles.resultInfo}>Правильных ответов: {correctAnswers} из {quizStorage.length}</p>
                            <p>Введите email для получения сертификата:</p>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={handleEmailChange} 
                                placeholder="Ваш email" 
                                required 
                                className={styles.emailInput}
                            />
                            <button type="submit" className={styles.submitButton}>
                                Получить сертификат
                            </button>
                        </form>
                    )
                ) : (
                    <div className={styles.failMessage}>
                        <h3>К сожалению, вы не прошли тест</h3>
                        <p className={styles.resultInfo}>Правильных ответов: {correctAnswers} из {quizStorage.length}</p>
                        <p>Для получения сертификата необходимо набрать минимум 13 правильных ответов.</p>
                        <p>Рекомендуем повторить изученные темы и попробовать снова.</p>
                        <button 
                            className={styles.restartButton} 
                            onClick={restartQuiz}
                        >
                            Начать заново
                        </button>
                    </div>
                )
            )}
        </div>
    )
}

export default QuizCard;