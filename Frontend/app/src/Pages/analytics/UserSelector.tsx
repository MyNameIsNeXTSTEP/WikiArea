import { StandartDropdown, StandartDropdownOption } from "@ui/Atoms/Inputs"
import { purpleMainColor } from "@ui/Tokens";
import { useSelector } from "react-redux";
import { IProfileAuthData } from "~/src/features/store/users";

interface IProps {
    setUser: (user: IProfileAuthData) => void,
};

const UserSelector = ({ setUser }: IProps): JSX.Element => {
    const { users } = useSelector(state => state.users);
    const selectUser = (user: IProfileAuthData) => {
        setUser(user);
    };
    return <>
        <StandartDropdown id="role-selector"
            style={{
                position: 'absolute',
                zIndex: 1000,
                height: '50vh',
                marginTop: '2.5rem',
                overflow: 'scroll',
            }}
        >
            { users.map((user: IProfileAuthData) =>
                <StandartDropdownOption
                    key={user.login}
                    onClick={() => selectUser(user)}
                    style={{
                        width: '200px',
                        height: '30px',
                        color: 'white',
                        backgroundColor: purpleMainColor,
                    }}
                >
                    {user.login}
                </StandartDropdownOption>
            )}
        </StandartDropdown>
    </>
};

export default UserSelector;