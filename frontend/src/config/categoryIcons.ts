import type { SvgIconComponent } from '@mui/icons-material';
import KitchenRounded from '@mui/icons-material/KitchenRounded';
import RestaurantRounded from '@mui/icons-material/RestaurantRounded';
import ChairRounded from '@mui/icons-material/ChairRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import Inventory2Rounded from '@mui/icons-material/Inventory2Rounded';
import CleaningServicesRounded from '@mui/icons-material/CleaningServicesRounded';
import BathtubRounded from '@mui/icons-material/BathtubRounded';
import LightRounded from '@mui/icons-material/LightRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import ChildFriendlyRounded from '@mui/icons-material/ChildFriendlyRounded';
import ElderlyRounded from '@mui/icons-material/ElderlyRounded';
import AccessibleRounded from '@mui/icons-material/AccessibleRounded';
import WcRounded from '@mui/icons-material/WcRounded';
import MonitorHeartRounded from '@mui/icons-material/MonitorHeartRounded';
import MedicationRounded from '@mui/icons-material/MedicationRounded';
import LocalHospitalRounded from '@mui/icons-material/LocalHospitalRounded';
import FitnessCenterRounded from '@mui/icons-material/FitnessCenterRounded';
import SportsGymnasticsRounded from '@mui/icons-material/SportsGymnasticsRounded';
import SelfImprovementRounded from '@mui/icons-material/SelfImprovementRounded';
import SportsSoccerRounded from '@mui/icons-material/SportsSoccerRounded';
import SpaRounded from '@mui/icons-material/SpaRounded';
import CategoryRounded from '@mui/icons-material/CategoryRounded';
import HealingRounded from '@mui/icons-material/HealingRounded';
import DeviceThermostatRounded from '@mui/icons-material/DeviceThermostatRounded';
import AirRounded from '@mui/icons-material/AirRounded';
import AirlineSeatReclineExtraRounded from '@mui/icons-material/AirlineSeatReclineExtraRounded';
import HotelRounded from '@mui/icons-material/HotelRounded';
import MedicalServicesRounded from '@mui/icons-material/MedicalServicesRounded';
import BloodtypeRounded from '@mui/icons-material/BloodtypeRounded';
import DirectionsRunRounded from '@mui/icons-material/DirectionsRunRounded';
import DirectionsBikeRounded from '@mui/icons-material/DirectionsBikeRounded';
import SportsMmaRounded from '@mui/icons-material/SportsMmaRounded';
import SportsTennisRounded from '@mui/icons-material/SportsTennisRounded';
import ElectricScooterRounded from '@mui/icons-material/ElectricScooterRounded';
import PoolRounded from '@mui/icons-material/PoolRounded';
import ChairAltRounded from '@mui/icons-material/ChairAltRounded';
import SportsHandballRounded from '@mui/icons-material/SportsHandballRounded';
import SoupKitchenRounded from '@mui/icons-material/SoupKitchenRounded';
import BlenderRounded from '@mui/icons-material/BlenderRounded';
import DryCleaningRounded from '@mui/icons-material/DryCleaningRounded';
import LocalFloristRounded from '@mui/icons-material/LocalFloristRounded';
import YardRounded from '@mui/icons-material/YardRounded';
import ToysRounded from '@mui/icons-material/ToysRounded';

/**
 * Набор иконок для категорий.
 * В базе у категории хранится только ключ (например 'kitchen'),
 * а в админке при создании категории будет сетка этих иконок — выбираешь одну кликом.
 * Новая иконка = одна строка здесь (любая из https://mui.com/material-ui/material-icons/).
 */
export const CATEGORY_ICONS: Record<string, { icon: SvgIconComponent; label: string }> = {
  kitchen: { icon: KitchenRounded, label: 'Кухня' },
  dishes: { icon: RestaurantRounded, label: 'Посуда' },
  furniture: { icon: ChairRounded, label: 'Мебель' },
  home: { icon: HomeRounded, label: 'Дом' },
  storage: { icon: Inventory2Rounded, label: 'Хранение' },
  cleaning: { icon: CleaningServicesRounded, label: 'Уборка' },
  bath: { icon: BathtubRounded, label: 'Ванная' },
  light: { icon: LightRounded, label: 'Свет' },
  posture: { icon: AccessibilityNewRounded, label: 'Осанка, корсеты' },
  baby: { icon: ChildFriendlyRounded, label: 'Детское' },
  cane: { icon: ElderlyRounded, label: 'Трости' },
  wheelchair: { icon: AccessibleRounded, label: 'Коляски' },
  toilet: { icon: WcRounded, label: 'Туалеты' },
  heart: { icon: MonitorHeartRounded, label: 'Тонометры, давление' },
  medicine: { icon: MedicationRounded, label: 'Лекарства' },
  medical: { icon: LocalHospitalRounded, label: 'Медицина' },
  weights: { icon: FitnessCenterRounded, label: 'Гантели, гири' },
  fitness: { icon: SportsGymnasticsRounded, label: 'Фитнес' },
  yoga: { icon: SelfImprovementRounded, label: 'Йога' },
  ball: { icon: SportsSoccerRounded, label: 'Мячи, игры' },
  care: { icon: SpaRounded, label: 'Уход' },
  healing: { icon: HealingRounded, label: 'Ортопедия' },
  thermo: { icon: DeviceThermostatRounded, label: 'Термометры' },
  inhaler: { icon: AirRounded, label: 'Ингаляторы' },
  massage: { icon: AirlineSeatReclineExtraRounded, label: 'Массаж' },
  bed: { icon: HotelRounded, label: 'Кровати, уход' },
  firstaid: { icon: MedicalServicesRounded, label: 'Аптечки' },
  glucose: { icon: BloodtypeRounded, label: 'Глюкометры' },
  run: { icon: DirectionsRunRounded, label: 'Бег' },
  bike: { icon: DirectionsBikeRounded, label: 'Велосипед' },
  barbell: { icon: FitnessCenterRounded, label: 'Штанги' },
  bench: { icon: ChairAltRounded, label: 'Скамьи' },
  pullup: { icon: SportsHandballRounded, label: 'Турники' },
  boxing: { icon: SportsMmaRounded, label: 'Бокс' },
  tennis: { icon: SportsTennisRounded, label: 'Теннис' },
  scooter: { icon: ElectricScooterRounded, label: 'Самокаты' },
  swim: { icon: PoolRounded, label: 'Плавание' },
  pan: { icon: SoupKitchenRounded, label: 'Кастрюли' },
  blender: { icon: BlenderRounded, label: 'Техника' },
  textile: { icon: DryCleaningRounded, label: 'Текстиль' },
  decor: { icon: LocalFloristRounded, label: 'Декор' },
  garden: { icon: YardRounded, label: 'Сад' },
  toys: { icon: ToysRounded, label: 'Игрушки' },
};

/** Если ключ не задан или неизвестен — нейтральная иконка. */
export function getCategoryIcon(key?: string): SvgIconComponent {
  return (key && CATEGORY_ICONS[key]?.icon) || CategoryRounded;
}
