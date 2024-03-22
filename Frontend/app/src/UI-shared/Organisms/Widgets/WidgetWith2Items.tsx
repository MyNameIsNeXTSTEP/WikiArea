import { ReactNode } from "react";
import * as ST from "./styled";

interface IProps {
  children: ReactNode | ReactNode[];
  rest?: any;
  height?: string,
  $rounded?: boolean,
  $smallMargins?: boolean,
  $fullWidth: boolean,
}

const WidgetWith2Items = ({ children, ...rest }: IProps): JSX.Element => {
  return (
    <ST.Wrapper {...rest} className="widget">
      {children}
    </ST.Wrapper>
  );
};

export default WidgetWith2Items;
