import React, { FC } from 'react'
import './index.scss'
import loadable from '../../utils/loadable'

const ChartsLine = loadable(() => import('../../compments/line'))
export default class PersonalStatistics extends React.Component {
  render() {
    return (
      <div className='personal-statistics'>
        <ChartsLine  />
        <ChartsLine  />
        <ChartsLine  />
        <ChartsLine  />
        <ChartsLine  />
        <ChartsLine  />
        </div>
    )
    }
}
