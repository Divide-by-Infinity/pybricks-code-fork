// SPDX-License-Identifier: MIT
// Copyright (c) 2020-2022 The Pybricks Authors

import { Button, Intent, ProgressBar } from '@blueprintjs/core';
import { Classes as Classes2, Popover2, Popover2Props } from '@blueprintjs/popover2';
import { I18n, useI18n } from '@shopify/react-i18n';
import React from 'react';
import { BleConnectionState } from '../ble/reducers';
import { useSelector } from '../reducers';
import { preventBrowserNativeContextMenu } from '../utils/react';
import { I18nId } from './i18n';

import './status-bar.scss';

const commonPopoverProps: Partial<Popover2Props> = {
    popoverClassName: Classes2.POPOVER2_CONTENT_SIZING,
    placement: 'top',
};

type HubInfoButtonProps = {
    /** Translation context. */
    i18n: I18n;
};

const HubInfoButton: React.VoidFunctionComponent<HubInfoButtonProps> = ({ i18n }) => {
    const deviceName = useSelector((s) => s.ble.deviceName);
    const deviceType = useSelector((s) => s.ble.deviceType);
    const deviceFirmwareVersion = useSelector((s) => s.ble.deviceFirmwareVersion);

    return (
        <Popover2
            {...commonPopoverProps}
            content={
                <table className="no-wrap">
                    <tbody>
                        <tr>
                            <td>
                                <strong>
                                    {i18n.translate(I18nId.HubInfoConnectedTo)}
                                </strong>
                            </td>
                            <td>{deviceName}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{i18n.translate(I18nId.HubInfoHubType)}</strong>
                            </td>
                            <td>{deviceType}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    {i18n.translate(I18nId.HubInfoFirmware)}
                                </strong>
                            </td>
                            <td>v{deviceFirmwareVersion}</td>
                        </tr>
                    </tbody>
                </table>
            }
        >
            <Button title={i18n.translate(I18nId.HubInfoTitle)} minimal={true}>
                {deviceName}
            </Button>
        </Popover2>
    );
};

type BatteryIndicatorProps = {
    /** Translation context. */
    i18n: I18n;
};

const BatteryIndicator: React.VoidFunctionComponent<BatteryIndicatorProps> = ({
    i18n,
}) => {
    const charging = useSelector((s) => s.ble.deviceBatteryCharging);
    const lowBatteryWarning = useSelector((s) => s.ble.deviceLowBatteryWarning);

    return (
        <Popover2
            {...commonPopoverProps}
            content={
                <span className="no-wrap">
                    {i18n.translate(
                        lowBatteryWarning ? I18nId.BatteryLow : I18nId.BatteryOk,
                    )}
                </span>
            }
        >
            <div
                title={i18n.translate(I18nId.BatteryTitle)}
                className="pb-battery-indicator"
                style={{ cursor: 'pointer' }}
            >
                <div className="pb-battery-indicator-body">
                    <ProgressBar
                        animate={charging}
                        stripes={charging}
                        intent={lowBatteryWarning ? Intent.DANGER : Intent.SUCCESS}
                    />
                </div>
                <div className="pb-battery-indicator-tip" />
            </div>
        </Popover2>
    );
};

const StatusBar: React.VFC = (_props) => {
    const connection = useSelector((s) => s.ble.connection);
    const [i18n] = useI18n();

    return (
        <div
            className="pb-status-bar"
            role="status"
            aria-live="off"
            onContextMenu={preventBrowserNativeContextMenu}
        >
            {connection === BleConnectionState.Connected && (
                <>
                    <HubInfoButton i18n={i18n} />
                    <BatteryIndicator i18n={i18n} />
                </>
            )}
        </div>
    );
};

export default StatusBar;
