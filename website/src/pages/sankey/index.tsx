import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import omit from 'lodash/omit.js'
import { generateSankeyData } from '@nivo/generators'
import {
    ResponsiveSankey,
    svgDefaultProps,
    SankeySvgProps,
    DefaultNode,
    DefaultLink,
} from '@nivo/sankey'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sankey/meta.yml'
import mapper, { UnmappedSankeyProps, MappedSankeyProps } from '../../data/components/sankey/mapper'
import { groups } from '../../data/components/sankey/props'

const initialProperties: UnmappedSankeyProps = {
    margin: {
        top: 40,
        right: 160,
        bottom: 40,
        left: 50,
    },
    valueFormat: { format: '', enabled: false },
    layout: 'horizontal' as const,
    align: 'justify' as const,
    sort: 'auto' as const,
    colors: { scheme: 'category10' as const },
    nodeOpacity: 1,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.35,
    nodeThickness: 18,
    nodeInnerPadding: 0,
    nodeSpacing: 24,
    nodeBorderWidth: 0,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },
    nodeBorderRadius: 3,
    linkOpacity: 0.5,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.1,
    linkContract: 3,
    linkBlendMode: 'multiply' as const,
    enableLinkGradient: true,
    enableLabels: true,
    labelPosition: 'outside' as const,
    labelOrientation: 'vertical' as const,
    labelPadding: 16,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    isInteractive: svgDefaultProps.isInteractive,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'right-to-left',
            itemsSpacing: 2,
            itemTextColor: '#999',
            symbolSize: 14,
        },
    ],
}

const generateData = () => generateSankeyData({ nodeCount: 6, maxIterations: 8 })

const Sankey = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/sankey.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<
            UnmappedSankeyProps,
            MappedSankeyProps,
            SankeySvgProps<DefaultNode, DefaultLink>['data']
        >
            name="Sankey"
            meta={meta.Sankey}
            icon="sankey"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveSankey
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        onClick={node => {
                            let label
                            if ('id' in node) {
                                label = `[node] ${node.id}: ${node.value}`
                            } else {
                                label = `[link] ${node.source.id} > ${node.target.id}: ${node.value}`
                            }

                            logAction({
                                type: 'click',
                                label,
                                data: omit(node, [
                                    'sourceLinks',
                                    'targetLinks',
                                    'source.sourceLinks',
                                    'source.targetLinks',
                                    'target.sourceLinks',
                                    'target.targetLinks',
                                ]),
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Sankey
