import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsiveStream, svgDefaultProps } from '@nivo/stream'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/stream/meta.yml'
import mapper from '../../data/components/stream/mapper'
import { groups } from '../../data/components/stream/props'
import { generateLightDataSet } from '../../data/components/stream/generator'
import defaultSettings from '../../data/components/stream/defaults'

const initialProperties = {
    ...defaultSettings,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const Stream = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/stream.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Stream"
            meta={meta.Stream}
            icon="stream"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, _logAction, chartRef) => {
                return (
                    <ResponsiveStream
                        {...properties}
                        data={data.data}
                        keys={data.keys}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Stream
