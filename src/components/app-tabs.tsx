import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      
      {/* 1. Inicio */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* 2. Catálogo de Productos */}
      <NativeTabs.Trigger name="productos">
        <NativeTabs.Trigger.Label>Catálogo</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')} 
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* 3. Carrito */}
      <NativeTabs.Trigger name="carrito">
        <NativeTabs.Trigger.Label>Carrito</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')} 
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* 4. Login / Cuenta */}
      <NativeTabs.Trigger name="login">
        <NativeTabs.Trigger.Label>Cuenta</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')} 
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}