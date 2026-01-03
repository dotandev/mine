import clsx from 'clsx';

function Office({
    name,
    children,
    invert = false,
}: {
    name: string;
    children: React.ReactNode;
    invert?: boolean;
}) {
    return (
        <address
            className={clsx(
                'text-sm not-italic',
                invert ? 'text-neutral-300' : 'text-neutral-600',
            )}
        >
            <strong className={invert ? 'text-white' : 'text-neutral-950'}>
                {name}
            </strong>
            <br />
            {children}
        </address>
    );
}

export function Offices({
    invert = false,
    ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean; }) {
    return (
        <ul role="list" {...props}>
            <li>
                <Office name="Permanent Site" invert={invert}>
                    179 Ajao Estate Road,
                    <br />
                    Airport Road, Ikeja, Lagos.
                    <br />
                    (+234) 811 720 7383
                    <br />
                    admin@fcmfoundation.org
                </Office>
            </li>
            <li>
                <Office name="ULSP" invert={invert}>
                    179 Ajao Estate Road,
                    <br />
                    Airport Road, Ikeja, Lagos.
                </Office>
            </li>
        </ul>
    );
}
