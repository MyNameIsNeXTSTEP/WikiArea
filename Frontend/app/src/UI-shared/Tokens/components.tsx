import { H1 } from ".";

interface IProps {
    text: string,
    $white: boolean,
}

export const H1Description = ({ text, $white }: IProps) => {
    return <H1 $white={$white}>{text}</H1>
};