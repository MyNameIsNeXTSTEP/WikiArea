import { useState, useEffect, useRef } from 'react'; 
import './styles.css'; 
import { StandartInput } from '../../Atoms/Inputs';
import { Button, ButtonRow } from '~/src/Components/BreakLine/styled';
  
// @todo: Return the object with component inside and the controls to apply it all inside the actual AuthPopup component
// return {
//     CaptchaComponent,
//     controls: {
//         input: {
//             userInput,
//             onChange: handleUserInputChange,
//         },
//         submit: {
//             onClick: handleCaptchaSubmit
//         }
//     }
// }
interface IProps {
    onSuccess: () => void,
}

const Captcha = ({ onSuccess }: IProps): JSX.Element => { 
    const [captchaText, setCaptchaText] = useState(''); 
    const [userInput, setUserInput] = useState(''); 
    const [isFailed, setIsFailed] = useState(false); 
    const canvasRef = useRef(null); 
  
    useEffect(() => { 
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 
        initializeCaptcha(ctx); 
    }, []); 
  
    const generateRandomChar = (min, max) => {
        return String.fromCharCode(Math.floor 
            (Math.random() * (max - min + 1) + min));
        }
  
    const generateCaptchaText = () => { 
        let captcha = ''; 
        // @todo: Refactor: Get rid of multiple function call
        captcha += generateRandomChar(65, 90); 
        captcha += generateRandomChar(97, 122); 
        captcha += generateRandomChar(48, 57); 
        captcha += generateRandomChar(48, 57); 
        return captcha.split('').sort( 
            () => Math.random() - 0.5).join(''); 
    }; 
  
    const drawCaptchaOnCanvas = (ctx, captcha) => { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)']; 
        const letterSpace = 150 / captcha.length; 
        for (let i = 0; i < captcha.length; i++) { 
            const xInitialSpace = 25; 
            ctx.font = '20px Roboto Mono'; 
            ctx.fillStyle = textColors[Math.floor( 
                Math.random() * 2)]; 
            ctx.fillText( 
                captcha[i], 
                xInitialSpace + i * letterSpace, 
                  
                // Randomize Y position slightly 
                Math.floor(Math.random() * 16 + 25), 
                100 
            ); 
        } 
    }; 
  
    const initializeCaptcha = (ctx) => { 
        setUserInput(''); 
        const newCaptcha = generateCaptchaText(); 
        setCaptchaText(newCaptcha); 
        drawCaptchaOnCanvas(ctx, newCaptcha); 
    }; 
  
    const handleUserInputChange = (e) => { 
        setUserInput(e.target.value); 
    }; 
  
    const handleCaptchaSubmit = () => { 
        if (userInput === captchaText) { 
            onSuccess(); 
        } else { 
            setIsFailed(true);
            const canvas = canvasRef.current; 
            const ctx = canvas.getContext('2d'); 
            initializeCaptcha(ctx); 
        } 
    };

    return <>
        <div className="container"> 
            <div className="wrapper"> 
                <canvas ref={canvasRef} 
                    width="200"
                    height="70"> 

                </canvas> 
            </div> 
            <button id="reload-button" onClick={ 
                () => initializeCaptcha( 
                    canvasRef.current.getContext('2d'))}> 
                Обновить 
            </button> 
        </div>
        <StandartInput
            placeholder="Введите текст с картинки..."
            value={userInput}
            onChange={handleUserInputChange}
        />
        <ButtonRow>
            <Button onClick={handleCaptchaSubmit} style={{ marginLeft: 0, marginBottom: 10 }}>Войти</Button>
        </ButtonRow>
        {isFailed && <strong style={{ color: 'red' }}>Не верно введён код, повторите снова.</strong>}
    </>
    }

export default Captcha;