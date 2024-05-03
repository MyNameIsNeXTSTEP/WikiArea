import styled from "styled-components";
import { purpleMainColor } from '@ui/Tokens';
import { CancelIconSVG } from "../../assets/components/Cancel";
import { createSvg } from "../../Atoms/svg/createSvg";

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${purpleMainColor};
    margin-bottom: 20px;
`;

export const ProfileMenu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    right: 1rem;
    top: 5rem;
    width: 150px;
    height: 240px;
    border: 3px solid ${purpleMainColor};
    z-index: 1000;
`;

export const MenuItemsList = styled.ul`
    text-decoration: none;
    margin-top: 25px;
    height: auto;
`;

export const MenuItem = styled.li`
    width: 100%;
    height: 30px;
    cursor: pointer;
    margin-bottom: 5px;
    a {
        list-style-type: none;
        text-decoration: none;
        color: ${purpleMainColor};
        &:hover {
            color: white;
        };
    }
    list-style-type: none;
    &:hover {
        background-color: ${purpleMainColor};
    };
`;

const CancelIcon = createSvg(
    CancelIconSVG,
    'CancelIcon',
    '0 0 70 70' 
);

export const Cancel = styled(CancelIcon)`
    align-self: center;
`;

export const IconBlock = styled.div`
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    background-color: ${purpleMainColor};
    cursor: pointer;
`;