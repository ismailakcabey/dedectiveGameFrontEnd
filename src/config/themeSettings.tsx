import { type ThemeConfig } from 'antd';

interface IColors {
  main: Record<string, string>;
  blue: Record<string, string>;
  yellow: Record<string, string>;
  darkBlue: Record<string, string>;
  softBlue: Record<string, string>;
  gray: Record<string, string>;
}

export const colors: IColors = {
  main: {
    yellow: '#ffcb05',
    lightYellow: '#FFF8AE',
    darkBlue: '#0D4BA0',
    blue: '#0087CD',
    lightBlue: '#65CBE5',
    gray: '#58595B',
    lightGray: '#E9E9EA',
    darkGray: '#475467',
  },
  blue: {
    50: '#e6f4fb',
    100: '#b0def2',
    200: '#8aceec',
    300: '#54b8e3',
    400: '#33aadd',
    500: '#0095d5',
    600: '#0088c2',
    700: '#006a97',
    800: '#005275',
    900: '#003f59',
  },
  yellow: {
    50: '#fffae6',
    100: '#ffefb0',
    200: '#ffe78a',
    300: '#ffdc54',
    400: '#ffd533',
    500: '#ffcb00',
    600: '#e8b900',
    700: '#b59000',
    800: '#8c7000',
    900: '#6b5500',
  },
  darkBlue: {
    50: '#e7edf6',
    100: '#b4c7e2',
    200: '#90acd3',
    300: '#5d86bf',
    400: '#3d6fb3',
    500: '#0d4ba0',
    600: '#0c4492',
    700: '#093572',
    800: '#072958',
    900: '#052043',
  },
  softBlue: {
    50: '#f0fafc',
    100: '#d0eff7',
    200: '#C9ECFF',
    300: '#98dcee',
    400: '#85d5ea',
    500: '#66cbe5',
    600: '#5db9d0',
    700: '#4890a3',
    800: '#38707e',
    900: '#2b5560',
  },
  gray: {
    50: '#e9e9e9',
    100: '#b9b9b9',
    200: '#989898',
    300: '#D0D5DD',
    400: '#4b4b4b',
    500: '#1e1e1e',
    600: '#1b1b1b',
    700: '#151515',
    800: '#111111',
    900: '#101828',
  },
};

export const themeSettings: ThemeConfig = {
  token: {
    fontFamily: 'Poppins, Verdana, Tahoma, sans-serif',
    colorPrimary: colors.blue[500],
    // colorPrimaryHover: colors.blue[600],
    borderRadius: 8,
    borderRadiusLG: 10,
    borderRadiusSM: 6,
    boxShadow:
      '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
    // controlOutline: '#F4EBFF',
    controlOutlineWidth: 3,
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    colorText: colors.main.darkGray,
    fontSizeSM: 12,
    fontSize: 14,
    fontSizeLG: 16,
    colorPrimaryBorder: '#b5f0ff',
    colorBorder: colors.gray[300],
    motionUnit: 0.03,
  },
  components: {
    Menu: {
      fontSize: 16,
      fontWeightStrong: 500,
      radiusItem: 8,
      radiusSubMenuItem: 2,
      colorItemText: colors.main.darkGray,
      colorItemBgSelected: colors.softBlue[200],
      colorActiveBarWidth: 0,
      controlHeight: 44,
      colorItemTextSelected: colors.blue[500],
    },
    Checkbox: {
      colorPrimary: colors.blue[500],
      controlHeight: 6,
    },
  },
};
