import Skeleton from 'modules/app/components/SkeletonThemed';
import { Stats } from 'modules/home/components/Stats';
import { useTotalDai } from 'modules/web3/hooks/useTotalDai';
import { useDaiSavingsRate } from 'modules/web3/hooks/useDaiSavingsRate';
import { useSystemSurplus } from 'modules/web3/hooks/useSystemSurplus';
import { useSystemWideDebtCeiling } from 'modules/web3/hooks/useSystemWideDebtCeiling';
import { formatValue } from 'lib/string';

export function SystemStats(): JSX.Element {
  const { data: totalDai } = useTotalDai();
  const { data: daiSavingsRate } = useDaiSavingsRate();
  const { data: systemSurplus } = useSystemSurplus();
  const { data: debtCeiling } = useSystemWideDebtCeiling();

  const infoUnits = [
    {
      title: 'GSUc Savings Rate',
      value: daiSavingsRate ? `${daiSavingsRate.toFixed(2)}%` : <Skeleton />
    },
    {
      title: 'Total GSUc',
      value: totalDai ? `${formatValue(totalDai, 'rad')} GSUc` : <Skeleton />
    },
    {
      title: 'GSUc Debt Ceiling',
      value: debtCeiling ? `${formatValue(debtCeiling, 'rad')} GSUc` : <Skeleton />
    },
    {
      title: 'System Surplus',
      value: systemSurplus ? `${formatValue(systemSurplus, 'rad')} GSUc` : <Skeleton />
    }
  ];

  return <Stats title="System Stats" infoUnits={infoUnits} viewMoreUrl="https://gsustats.gsuprotocol.io/" />;
}
