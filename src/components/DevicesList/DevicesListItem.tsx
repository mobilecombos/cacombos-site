import CardLink from '@components/Links/CardLink';

import dayjs from 'dayjs';

import type Device from '@api/Models/Device';

export interface DevicesListItemProps {
  device: Device;
  uriGenerator: (device: Device) => string;
}

export default function DevicesListItem({ device, uriGenerator }: DevicesListItemProps) {
  const modem = device.modem() || null;

  return (
    <li css={{ display: 'block', height: '100%' }}>
      <CardLink to={uriGenerator(device)} css={{ height: '100%' }}>
        <h3 className="text-loud">
          {device.manufacturer()} {device.deviceName()} ({device.modelName()})
        </h3>

        <dl css={{ marginTop: 'auto' }}>
          <DevicesListItemDescriptionValue name="Modem" value={modem?.name() ?? 'Unknown'} />
          <DevicesListItemDescriptionValue name="Release date" value={dayjs(device.releaseDate()).format('MMM YYYY')} />
        </dl>
      </CardLink>
    </li>
  );
}

interface DevicesListItemDescriptionValueProps {
  name: string;
  value: string;
}

function DevicesListItemDescriptionValue({ name, value }: DevicesListItemDescriptionValueProps) {
  return (
    <>
      <dt className="text-speak-up" css={{ marginTop: 8 }}>
        {name}
      </dt>
      <dd className="text-speak">{value}</dd>
    </>
  );
}
