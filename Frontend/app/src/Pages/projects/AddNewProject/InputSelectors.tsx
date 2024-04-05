import { StandartDropdown, StandartDropdownOption } from "~/src/UI-shared/Atoms/Inputs"

export interface IPropsTheme {
    updateTheme: (Theme: string) => void,
    isOpen: boolean
};

export interface IPropsComplexity {
    updateComplexity: (Theme: string) => void,
    isOpen: boolean
};

export const projectThemes = [
    'Web-разработка',
    'Мобильная разработка',
    'Игровая разработка',
    'Анализ данных и машинное обучение',
    'Компьютерная безопасность',
    'Робототехника',
];

export const projectComplexities = {
    easy: 'лёгкий',
    mid: 'средний',
    hard: 'сложный'
};

export const ThemeSelector = ({ updateTheme, isOpen }: IPropsTheme): JSX.Element | null => {
    if (!isOpen) return null;
    const selectTheme = (theme: string) => {
        updateTheme(theme);
    };
    return <StandartDropdown id="new-project-theme-selector">
        { projectThemes.map(el => <StandartDropdownOption height={'auto'} width={'100%'} onClick={() => selectTheme(el)}>{el}</StandartDropdownOption>) }
    </StandartDropdown>
};

export const ComplexitySelector = ({ updateComplexity, isOpen }: IPropsComplexity): JSX.Element | null => {
    if (!isOpen) return null;
    const selectComplexity = (theme: string) => {
        updateComplexity(theme);
    };
    return <StandartDropdown id="new-project-complexity-selector">
        { Object.values(projectComplexities).map(el => <StandartDropdownOption height={'auto'} width={'100%'} onClick={() => selectComplexity(el)}>{el}</StandartDropdownOption>) }
    </StandartDropdown>
};
