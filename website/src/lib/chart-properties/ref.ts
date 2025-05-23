import { ChartProperty, Flavor } from '../../types'

export const chartRef = (flavors: Exclude<Flavor, 'api'>[]): ChartProperty => {
    const elementTypes = flavors.map(flavor => {
        switch (flavor) {
            case 'svg':
                return 'SVGSVGElement'
            case 'canvas':
                return 'HTMLCanvasElement'
            case 'html':
                return 'HTMLDivElement'
            default:
                throw new Error(`chartRef not supported for the "${flavor}" implementation.`)
        }
    })

    return {
        key: 'ref',
        group: 'Base',
        type: `Ref<${elementTypes.join(' | ')}>`,
        required: false,
        help: `Ref to the chart's container. Used on this page to generate/download the chart's image via [\`html-to-image\`](https://www.npmjs.com/package/html-to-image).`,
        flavors,
    } as ChartProperty
}
