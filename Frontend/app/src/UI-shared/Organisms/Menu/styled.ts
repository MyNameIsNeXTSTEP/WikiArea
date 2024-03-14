import styled from "styled-components";
import { purpleMainColor } from '~/src/UI-shared/Tokens';

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: start;
    top: 0;
    width: 100%;
    background-color: ${purpleMainColor};
    margin-bottom: 20px;
`;

export const PofileMenuIcon = styled.div`
    width: 60px;
    height: 60px;
    margin: 5px;
    border-radius: 50px;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
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
    height: 200px;
    border: 1px solid black;
    z-index: 1000;
`;

export const MenuItemsList = styled.ul`
    text-decoration: none;
`;

export const MenuItem = styled.li`
    width: 100%;
    height: 30px;
    cursor: pointer;
    margin-bottom: 5px;
    list-style-type: none;
    color: ${purpleMainColor};
    &:hover {
        background-color: ${purpleMainColor};
        color: white;
    };
`;