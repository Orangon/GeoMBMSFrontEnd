import { useEffect, useState, useMemo, useRef } from 'react';

import { connect, MqttClient } from 'mqtt';

import MqttContext from './Context';
import { Error, ConnectorProps, IMqttContext } from './types';

export default function Connector({
    children,
    brokerUrl,
    options = { keepalive: 0 },
    parserMethod,
}: ConnectorProps) {
    // Using a ref rather than relying on state because it is synchronous
    const clientValid = useRef(false);
    const [connectionStatus, setStatus] = useState<string | Error>('Offline');
    const [client, setClient] = useState<MqttClient | null>(null);

    useEffect(() => {
        if (!client && !clientValid.current) {
            // This synchronously ensures we won't enter this block again
            // before the client is asynchronously set
            clientValid.current = true;
            setStatus('Connecting');
            const mqtt = connect(brokerUrl, options);
            // let mqttClient = connect('wss://mq.cloud.geobeans.cn/ws/mqtt', {
            //     keepalive: 100,
            //     clientId: `mqtt_${new Date()}`,
            //     protocolId: 'MQTT',
            //     protocolVersion: 4,
            //     clean: true,
            //     reconnectPeriod: 5000, //两次重新连接之间的间隔。通过设置为0禁用自动重新连接
            //     connectTimeout: 30 * 1000,
            //     will: {
            //         topic: 'WillMsg',
            //         payload: '连接异常关闭!',
            //         qos: 0,
            //         retain: false,
            //     },
            //     username: 'onesis:guest',
            //     password: 'guest',
            //     rejectUnauthorized: false, //如果您使用的是自签名证书,传false
            //     resubscribe: true, //如果连接断开并重新连接，订阅的主题将自动生效
            // });
            mqtt.on('connect', () => {
                setStatus('Connected');
                // For some reason setting the client as soon as we get it from connect breaks things
                setClient(mqtt);
            });
            mqtt.on('reconnect', () => {
                console.debug('on reconnect');
                setStatus('Reconnecting');
            });
            mqtt.on('error', (err) => {
                console.log(`Connection error: ${err}`);
                setStatus(err.message);
            });
            mqtt.on('offline', () => {
                console.debug('on offline');
                setStatus('Offline');
            });
            mqtt.on('end', () => {
                console.debug('on end');
                setStatus('Offline');
            });
        }
    }, [client, clientValid, brokerUrl, options]);

    // Only do this when the component unmounts
    useEffect(
        () => () => {
            if (client) {
                console.log('closing mqtt client');
                client.end(true);
                setClient(null);
                clientValid.current = false;
            }
        },
        [client, clientValid],
    );

    // This is to satisfy
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
    const value: IMqttContext = useMemo<IMqttContext>(() => {
        return {
            connectionStatus,
            client,
            parserMethod,
        };
    }, [connectionStatus, client, parserMethod]);

    return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>;
}
