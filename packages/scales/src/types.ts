import {
    ScaleLinear as D3ScaleLinear,
    ScalePoint as D3ScalePoint,
    ScaleBand as D3ScaleBand,
    ScaleLogarithmic as D3ScaleLogarithmic,
    ScaleSymLog as D3ScaleSymLog,
    ScaleTime as D3ScaleTime,
} from 'd3-scale'
import { TIME_PRECISION } from './timeHelpers'

export type ScaleAxis = 'x' | 'y'
export type OtherScaleAxis<Axis extends ScaleAxis> = Axis extends 'x' ? 'y' : 'x'

export type NumericValue = { valueOf(): number }
export type StringValue = { toString(): string }
export type ScaleValue = NumericValue | StringValue | Date | null

export interface ScaleTypeToSpec {
    linear: ScaleLinearSpec
    log: ScaleLogSpec
    symlog: ScaleSymlogSpec
    point: ScalePointSpec
    band: ScaleBandSpec
    time: ScaleTimeSpec
}

export type ScaleType = keyof ScaleTypeToSpec
export type ScaleSpec = ScaleTypeToSpec[keyof ScaleTypeToSpec]

export type ReversibleScaleSpec = ScaleLinearSpec | ScaleLogSpec | ScaleSymlogSpec

export const isReversibleScaleSpec = (scaleSpec: ScaleSpec): scaleSpec is ReversibleScaleSpec => {
    return scaleSpec.type === 'linear' || scaleSpec.type === 'log' || scaleSpec.type === 'symlog'
}

export interface ScaleTypeToScale<Input, Output> {
    linear: Input extends NumericValue ? ScaleLinear<Output> : never
    log: Input extends NumericValue ? ScaleLog : never
    symlog: Input extends NumericValue ? ScaleSymlog : never
    point: Input extends StringValue ? ScalePoint<Input> : never
    band: Input extends StringValue ? ScaleBand<Input> : never
    time: Input extends StringValue | Date ? ScaleTime<Input> : never
}

export type Scale<Input, Output> = ScaleTypeToScale<Input, Output>[keyof ScaleTypeToScale<
    Input,
    Output
>]

export type ScaleLinearSpec = {
    type: 'linear'
    min?: 'auto' | number
    max?: 'auto' | number
    stacked?: boolean
    reverse?: boolean
    clamp?: boolean
    nice?: boolean | number
    round?: boolean
}
export interface ScaleLinear<Output> extends D3ScaleLinear<number, Output, never> {
    type: 'linear'
    stacked: boolean
}

export interface ScaleLogSpec {
    type: 'log'
    base?: number
    min?: 'auto' | number
    max?: 'auto' | number
    round?: boolean
    reverse?: boolean
    nice?: boolean | number
}
export interface ScaleLog extends D3ScaleLogarithmic<number, number> {
    type: 'log'
}

export interface ScaleSymlogSpec {
    type: 'symlog'
    constant?: number
    min?: 'auto' | number
    max?: 'auto' | number
    round?: boolean
    reverse?: boolean
    nice?: boolean | number
}
export interface ScaleSymlog extends D3ScaleSymLog<number, number> {
    type: 'symlog'
}

export type ScalePointSpec = {
    type: 'point'
}
export interface ScalePoint<Input extends StringValue> extends D3ScalePoint<Input> {
    type: 'point'
}

export type ScaleBandSpec = {
    type: 'band'
    round?: boolean
}
export interface ScaleBand<Input extends StringValue> extends D3ScaleBand<Input> {
    type: 'band'
}

export type ScaleTimeSpec = {
    type: 'time'
    format?: 'native' | string
    precision?: TIME_PRECISION
    min?: 'auto' | Date | string
    max?: 'auto' | Date | string
    useUTC?: boolean
    nice?: boolean
}

export interface ScaleTime<Input> extends D3ScaleTime<Input, number> {
    type: 'time'
    useUTC: boolean
}

export type AnyScale = Scale<any, any>

export type ScaleWithBandwidth = ScaleBand<any> | ScalePoint<any>

export type Series<XValue extends ScaleValue, YValue extends ScaleValue> = {
    data: {
        data: {
            x: XValue | null
            y: YValue | null
        }
    }[]
}[]

// A serie containing data for a specific axis
export type SerieAxis<Axis extends ScaleAxis, Value extends ScaleValue> = {
    data: {
        data: Record<Axis, Value | null>
    }[]
}[]

export type ComputedSerieAxis<Value extends ScaleValue> = {
    all: readonly Value[]
    min: Value
    minStacked?: Value
    max: Value
    maxStacked?: Value
}

export type TicksSpec<Value extends ScaleValue> =
    // exact number of ticks, please note that
    // depending on the current range of values,
    // you might not get this exact count
    | number
    // string is used for Date based scales,
    // it can express a time interval,
    // for example: every 2 weeks
    | string
    // override scale ticks with custom explicit values
    | readonly Value[]
