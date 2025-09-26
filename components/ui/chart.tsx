"use client""use client"'use client'



import * as React from "react"

import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"import * as React from "react"import * as React from 'react'



const THEMES = { light: "", dark: ".dark" } as constimport * as RechartsPrimitive from "recharts"import * as RechartsPrimitive from 'recharts'



export type ChartConfig = {

  [k in string]: {

    label?: React.ReactNodeimport { cn } from "@/lib/utils"import { cn } from '@/lib/utils'

    icon?: React.ComponentType

  } & (

    | { color?: string; theme?: never }

    | { color?: never; theme: Record<keyof typeof THEMES, string> }const THEMES = { light: "", dark: ".dark" } as const// Format: { THEME_NAME: CSS_SELECTOR }

  )

}"use client"



type ChartContextProps = {export type ChartConfig = {

  config: ChartConfig

}  [k in string]: {import * as React from "react"



const ChartContext = React.createContext<ChartContextProps | null>(null)    label?: React.ReactNodeimport * as RechartsPrimitive from "recharts"



function useChart() {    icon?: React.ComponentType

  const context = React.useContext(ChartContext)

  if (!context) {  } & (import { cn } from "@/lib/utils"

    throw new Error("useChart must be used within a <ChartContainer />")

  }    | { color?: string; theme?: never }

  return context

}    | { color?: never; theme: Record<keyof typeof THEMES, string> }// Format: { THEME_NAME: CSS_SELECTOR }



const ChartContainer = React.forwardRef<  )const THEMES = { light: "", dark: ".dark" } as const

  HTMLDivElement,

  React.ComponentProps<"div"> & {}

    config: ChartConfig

    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]export type ChartConfig = {

  }

>(({ id, className, children, config, ...props }, ref) => {type ChartContextProps = {  [k in string]: {

  const uniqueId = React.useId()

  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`  config: ChartConfig    label?: React.ReactNode



  return (}    icon?: React.ComponentType

    <ChartContext.Provider value={{ config }}>

      <div  } & (

        data-chart={chartId}

        ref={ref}const ChartContext = React.createContext<ChartContextProps | null>(null)    | { color?: string; theme?: never }

        className={cn("flex aspect-video justify-center text-xs", className)}

        {...props}    | { color?: never; theme: Record<keyof typeof THEMES, string> }

      >

        <ChartStyle id={chartId} config={config} />function useChart() {  )

        <RechartsPrimitive.ResponsiveContainer>

          {children}  const context = React.useContext(ChartContext)}

        </RechartsPrimitive.ResponsiveContainer>

      </div>

    </ChartContext.Provider>

  )  if (!context) {type ChartContextProps = {

})

ChartContainer.displayName = "Chart"    throw new Error("useChart must be used within a <ChartContainer />")  config: ChartConfig



const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {  }}

  const colorConfig = Object.entries(config).filter(

    ([_, config]) => config.theme || config.color,

  )

  return contextconst ChartContext = React.createContext<ChartContextProps | null>(null)

  if (!colorConfig.length) {

    return null}

  }

function useChart() {

  return (

    <styleconst ChartContainer = React.forwardRef<  const context = React.useContext(ChartContext)

      dangerouslySetInnerHTML={{

        __html: Object.entries(THEMES)  HTMLDivElement,

          .map(

            ([theme, prefix]) =>  React.ComponentProps<"div"> & {  if (!context) {

              `${prefix} [data-chart=${id}] {

${colorConfig    config: ChartConfig    throw new Error("useChart must be used within a <ChartContainer />")

  .map(([key, itemConfig]) => {

    const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color    children: React.ComponentProps<  }

    return color ? `  --color-${key}: ${color};` : null

  })      typeof RechartsPrimitive.ResponsiveContainer

  .filter(Boolean)

  .join("\n")}    >["children"]  return context

}`,

          )  }}

          .join(""),

      }}>(({ id, className, children, config, ...props }, ref) => {

    />

  )  const uniqueId = React.useId()const ChartContainer = React.forwardRef<

}

  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`  HTMLDivElement,

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<  React.ComponentProps<"div"> & {

  HTMLDivElement,

  React.ComponentProps<"div">  return (    config: ChartConfig

>(({ className, ...props }, ref) => {

  return (    <ChartContext.Provider value={{ config }}>    children: React.ComponentProps<

    <div

      ref={ref}      <div      typeof RechartsPrimitive.ResponsiveContainer

      className={cn(

        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",        data-chart={chartId}    >["children"]

        className,

      )}        ref={ref}  }

      {...props}

    />        className={cn(>(({ id, className, children, config, ...props }, ref) => {

  )

})          "flex aspect-video justify-center text-xs",  const uniqueId = React.useId()

ChartTooltipContent.displayName = "ChartTooltipContent"

          className,  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<        )}

  HTMLDivElement,

  React.ComponentProps<"div">        {...props}  return (

>(({ className, ...props }, ref) => {

  return (      >    <ChartContext.Provider value={{ config }}>

    <div

      ref={ref}        <ChartStyle id={chartId} config={config} />      <div

      className={cn("flex items-center justify-center gap-4", className)}

      {...props}        <RechartsPrimitive.ResponsiveContainer>        data-chart={chartId}

    />

  )          {children}        ref={ref}

})

ChartLegendContent.displayName = "ChartLegendContent"        </RechartsPrimitive.ResponsiveContainer>        className={cn(



export {      </div>          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",

  ChartContainer,

  ChartTooltip,    </ChartContext.Provider>          className,

  ChartTooltipContent,

  ChartLegend,  )        )}

  ChartLegendContent,

  ChartStyle,})        {...props}

}
ChartContainer.displayName = "Chart"      >

        <ChartStyle id={chartId} config={config} />

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {        <RechartsPrimitive.ResponsiveContainer>

  const colorConfig = Object.entries(config).filter(          {children}

    ([_, config]) => config.theme || config.color,        </RechartsPrimitive.ResponsiveContainer>

  )      </div>

    </ChartContext.Provider>

  if (!colorConfig.length) {  )

    return null})

  }ChartContainer.displayName = "Chart"



  return (const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {

    <style  const colorConfig = Object.entries(config).filter(

      dangerouslySetInnerHTML={{    ([_, config]) => config.theme || config.color,

        __html: Object.entries(THEMES)  )

          .map(

            ([theme, prefix]) =>  if (!colorConfig.length) {

              `    return null

${prefix} [data-chart=${id}] {  }

${colorConfig

  .map(([key, itemConfig]) => {  return (

    const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color    <style

    return color ? `  --color-${key}: ${color};` : null      dangerouslySetInnerHTML={{

  })        __html: Object.entries(THEMES)

  .filter(Boolean)          .map(

  .join("\n")}            ([theme, prefix]) =>

}              `

`,${prefix} [data-chart=${id}] {

          )${colorConfig

          .join(""),  .map(([key, itemConfig]) => {

      }}    const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color

    />    return color ? `  --color-${key}: ${color};` : null

  )  })

}  .filter(Boolean)

  .join("\n")}

const ChartTooltip = RechartsPrimitive.Tooltip}

`,

const ChartTooltipContent = React.forwardRef<          )

  HTMLDivElement,          .join(""),

  React.ComponentProps<"div"> & {      }}

    hideLabel?: boolean    />

    hideIndicator?: boolean  )

    indicator?: 'line' | 'dot' | 'dashed'}

    nameKey?: string

    labelKey?: stringconst ChartTooltip = RechartsPrimitive.Tooltip

  }

>(({ className, ...props }, ref) => {// Simplified ChartTooltipContent to avoid complex typing issues

  return (const ChartTooltipContent = React.forwardRef<

    <div  HTMLDivElement,

      ref={ref}  React.ComponentProps<"div"> & {

      className={cn(    hideLabel?: boolean

        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",    hideIndicator?: boolean

        className,    indicator?: 'line' | 'dot' | 'dashed'

      )}    nameKey?: string

      {...props}    labelKey?: string

    />  }

  )>(({ className, hideLabel = false, ...props }, ref) => {

})  const { config } = useChart()



ChartTooltipContent.displayName = "ChartTooltipContent"  return (

    <div

const ChartLegend = RechartsPrimitive.Legend      ref={ref}

      className={cn(

const ChartLegendContent = React.forwardRef<        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",

  HTMLDivElement,        className,

  React.ComponentProps<"div"> & {      )}

    hideIcon?: boolean      {...props}

    nameKey?: string    />

  }  )

>(({ className, ...props }, ref) => {})

  return (

    <divChartTooltipContent.displayName = "ChartTooltipContent"

      ref={ref}

      className={cn("flex items-center justify-center gap-4", className)}// Simplified ChartLegend to avoid complex typing issues  

      {...props}const ChartLegend = RechartsPrimitive.Legend

    />

  )const ChartLegendContent = React.forwardRef<

})  HTMLDivElement,

  React.ComponentProps<"div"> & {

ChartLegendContent.displayName = "ChartLegendContent"    hideIcon?: boolean

    nameKey?: string

export {  }

  ChartContainer,>(({ className, hideIcon = false, ...props }, ref) => {

  ChartTooltip,  const { config } = useChart()

  ChartTooltipContent,

  ChartLegend,  return (

  ChartLegendContent,    <div

  ChartStyle,      ref={ref}

}      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  )
})

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center',
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          },
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-between leading-none',
                      nestLabel ? 'items-end' : 'items-center',
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: React.ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={
              '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
            }
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
