import { StandartDropdown, StandartDropdownOption } from "@ui/Atoms/Inputs"

interface IProps {
    updateRole: (role: string) => void,
    isOpen: boolean
};

const roles = ['admin', 'teacher', 'student'];

const RolesSelector = ({ updateRole, isOpen }: IProps): JSX.Element | null => {
    if (!isOpen) return null;
    const selectRole = (role: string) => {
        updateRole(role);
    };
    return <StandartDropdown id="role-selector">
        { roles.map(el => <StandartDropdownOption onClick={() => selectRole(el)}>{el}</StandartDropdownOption>) }
    </StandartDropdown>
};

export default RolesSelector;