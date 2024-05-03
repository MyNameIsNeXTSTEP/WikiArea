import { ReactNode } from 'react';
import styled from 'styled-components';

export type TSvgSizeProps = {
    size: number,
    width?: number,
    height?: number,
}
export type TBaseSvgProps = {
    id: string,
    viewBox: string,
    role?: string,
    strokeWidth?: number,
    children?: ReactNode,
    color?: string
    onClick?: () => void,
} & TSvgSizeProps;

const Svg = ({ role = 'img', size = 24, width, height, color, ...props }: TBaseSvgProps): JSX.Element => {
    if (!width && !height) {
        width = size;
        height = size;
    }
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            role={role}
            width={width}
            height={height}
            fill={color}
            {...props}
        />
    );
};

export default styled(Svg)``;
