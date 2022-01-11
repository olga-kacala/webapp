import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import {
  calcPrice,
  spacingMultiplicityGte,
  spacingMultiplicityLte,
  nearestTickIndex
} from '@consts/utils'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import useStyles from './style'

export interface IRangeSelector {
  tokenASymbol: string
  tokenBSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  tokenASymbol,
  tokenBSymbol,
  onChangeRange,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInput(calcPrice(left, isXtoY, xDecimal, yDecimal).toString())
    setRightInput(calcPrice(right, isXtoY, xDecimal, yDecimal).toString())

    onChangeRange(left, right)
  }

  const resetRange = () => {}

  return (
    <Grid container className={classes.wrapper}>
      <Typography className={classes.header}>Starting price</Typography>
      <Grid container className={classes.innerWrapper}>

        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
          <RangeInput
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={leftInput}
            setValue={setLeftInput}
            decreaseValue={() => {
              const newLeft = isXtoY
                ? Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), leftRange - tickSpacing)
                : Math.min(spacingMultiplicityLte(MAX_TICK, tickSpacing), leftRange + tickSpacing)
              changeRangeHandler(newLeft, rightRange)
            }}
            increaseValue={() => {
              const newLeft = isXtoY
                ? Math.min(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.max(rightRange + tickSpacing, leftRange - tickSpacing)

              changeRangeHandler(newLeft, rightRange)
            }}
            onBlur={() => {
              const newLeft = isXtoY
                ? Math.min(
                    rightRange - tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.max(
                    rightRange + tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )

              changeRangeHandler(newLeft, rightRange)
            }}
          />
          <RangeInput
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={rightInput}
            setValue={setRightInput}
            decreaseValue={() => {
              const newRight = isXtoY
                ? Math.max(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.min(rightRange + tickSpacing, leftRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            increaseValue={() => {
              const newRight = isXtoY
                ? Math.min(spacingMultiplicityLte(MAX_TICK, tickSpacing), rightRange + tickSpacing)
                : Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), rightRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            onBlur={() => {
              const newRight = isXtoY
                ? Math.max(
                    leftRange + tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.min(
                    leftRange - tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
              changeRangeHandler(leftRange, newRight)
            }}
          />
        </Grid>
        <Grid container className={classes.buttons}>
          <Button className={classes.button} onClick={resetRange}>
            Reset range
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              changeRangeHandler(
                isXtoY
                  ? spacingMultiplicityGte(MIN_TICK, tickSpacing)
                  : spacingMultiplicityLte(MAX_TICK, tickSpacing),
                isXtoY
                  ? spacingMultiplicityLte(MAX_TICK, tickSpacing)
                  : spacingMultiplicityGte(MIN_TICK, tickSpacing)
              )
            }}>
            Set full range
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RangeSelector
