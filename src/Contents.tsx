import styles from './Contents.module.scss'
import React from 'react'

export default function Contents(props: {children?: React.ReactNode}) {
    return (
        <div className={styles.contents}>{props.children}</div>
    )
}