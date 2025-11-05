import { Switch } from '@headlessui/react';

interface ToggleProps {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, enabled, setEnabled }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <span className="font-semibold text-gray-700">{label}</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-emerald-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
