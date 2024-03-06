import styled from 'styled-components';
import Svg, { TBaseSvgProps, TSvgSizeProps } from './Svg';
export type TSvgProps = Omit<TBaseSvgProps, 'id' | 'viewBox'> & TSvgSizeProps;

/**
 * Usage:
 * const SomeSvgComponent = ({ ...props }: Type): JSX.Element => { return <></> }
 * export default createSvg(
 *  SomeSvgComponent,
 *  'svg-component-display-name',
 * );
 */
export const createSvg = (Path: (pathProps: any) => JSX.Element, displayName: string, viewBox = '0 0 24 24') => {
    const SvgComponent = (props: TSvgProps): JSX.Element => {
        let strokeWidth = undefined;
        if (props && 'size' in props && props.size) {
            strokeWidth = props.size <= 16 ? 2.2 : props.size <= 20 ? 2 : 1.5;
        }
        return (
            <Svg {...props} id={displayName} viewBox={viewBox}>
                <Path strokeWidth={strokeWidth}/>
            </Svg>
        );
    };
    SvgComponent.displayName = `Svg_${displayName}`;
    return styled(SvgComponent)``;
};
