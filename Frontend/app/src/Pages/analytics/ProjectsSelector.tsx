import { StandartDropdown, StandartDropdownOption } from "@ui/Atoms/Inputs"
import { purpleMainColor } from "@ui/Tokens";

export type TProjectToSelect = {
    name: string,
    id: number,
};

interface IProps {
    projects: TProjectToSelect[],
    setProject: (project: TProjectToSelect) => void,
};

const ProjectsSelector = ({ projects, setProject }: IProps): JSX.Element => {
    const selectProject = (project: TProjectToSelect) => {
        setProject(project);
    };
    return <StandartDropdown id="role-selector"
            style={{ position: 'absolute', zIndex: 1000, height: 'fit-content', marginTop: '2.5rem' }}
        >
        { projects.map(el =>
            <StandartDropdownOption
                key={el.id}
                onClick={() => selectProject(el)}
                style={{
                    width: '200px',
                    height: '30px',
                    color: 'white',
                    backgroundColor: purpleMainColor
                }}
            >
                {el.name || 'Без названия'}
            </StandartDropdownOption>
        )}
    </StandartDropdown>
};

export default ProjectsSelector;