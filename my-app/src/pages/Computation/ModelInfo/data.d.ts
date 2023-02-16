declare namespace GeoMBMS {
    namespace Model {
        //模型描述文件
        type Metadata = {
            //描述元数据
            meta: any,
            //执行环境、参数
            env: Array<ParamGroup | Param>
        }

        //参数组
        type ParamGroup = {
            title: string | i18,
            type: GroupType,
            children: Array<ParamGroup | Param>
        }

        //参数
        type Param = {
            //参数名称，唯一
            name: string,
            label: string | i18,
            description?: string | i18,
            //是否必须
            required?: boolean,
            default?: any;
            //参数渲染组件类型
            componentType: ComponentType,
            //组件初始化属性
            compnentProps?: {
                [key: string]: any
            },
            //默认显示隐藏，优先级低于Reaction.fulfill.state.visible;
            display?: 'visible' | 'hidden' | 'none',//visible：显示，hidden：半隐藏，none：全隐藏
            //参数依赖关系
            reactions?: Reaction,
            //参数校验
            validators?: Array<Validator>
        }

        type ParamInput = Param

        type ParamDataSelector = Param & {
            compnentProps?: {
                //文件后缀过滤 ['.csv','.shp']
                accept?: string[],
                //单文件选择
                single?: boolean,
                //选择模式：File文件、Folder文件夹、All全部
                mode?: OneSIS.Components.FileSelector.SelectMode | 'File' | 'Folder' | 'All'
            },

        }

        type ParamSelect = Param & {
            enum: Array<{ label: string, value: string | number }>
        }

        type ParamInputNumber = ParamInput & {
            compnentProps?: {
                step?: number,
                max?: number,
                min?: number
            }
        }

        type ParamSwitch = Param & {
            compnentProps?: {
                //初始是否选中
                defaultChecked?: boolean
                //选中时的内容
                checkedChildren?: string
                //非选中时的内容
                unCheckedChildren?: string
            }
        }

        type ParamRadioGroup = ParamSelect & {
            compnentProps?: {
                //选项风格类型：默认、按钮
                optionType: "default" | "button",
                //按钮风格样式：空心、实心
                buttonStyle: "outline" | 'solid',
            }
        }

        type ParamCheckboxGroup = ParamSelect

        type ParamDatePicker = Param & {
            compnentProps?: {
                //显示今天
                showToday?: boolean,
                //选择时间
                showTime?: boolean,
                //选择器类型
                picker: "date" | "time" | "month" | "year" | "quarter",
                //格式
                format?: "YYYY-MM-DD",
            }
        }

        type ParamSlider = Param & {
            compnentProps?: {
                //双滑块
                range?: boolean,
                step?: number,
                min?: number,
                max?: number
            }
        }

        //国际化
        type i18 = {
            "zh-CN": string,
            "en": string
        }

        // 参数间联动协议
        // 说明：$deps表示当前上下文，$self表示当前组件。
        type Reaction = {
            //依赖的字段路径列表
            dependencies: {
                //参数名
                name: string,
                //参数属性名
                property: "value" | string
            }[],
            //满足条件
            fulfill?: {
                //更新组件状态
                state: {
                    // 显示隐藏控制
                    // 1、实例"{{$deps.input?.ext===\"jpg\"}}"
                    visible?: string,
                    // 组件value
                    // 1、实例，将max_steps值赋值给当前组件"{{$deps.max_steps}}"
                    // 2、实例，如果bbb的值大于当前控件值，将bbb值赋值给当前控件"{{$deps.bbb>$self.value?$deps.bbb:$self.value}}",
                    value?: string,
                    [key: string]: string;
                },
                // 执行语句。例如：可编写接口调用逻辑。
                // 1、根据input值构造数据源："$effect(() => {\n  $self.loading = true\n  setTimeout(() => {\n    $self.dataSource = [1, 2].map((item) => {\n      return {\n        label: $deps?.input?.ext + item,\n        value: $deps?.input?.ext + item,\n      }\n    })\n    $self.loading = false\n  }, 1000)\n}, [$deps.input])\n"
                // 2、调用接口获取数据源："$effect(() => {\n  $self.loading = true\n  fetch('//some.domain/getSomething')\n    .then(response=>response.json())\n    .then(({ data })=>{\n      $self.loading = false\n      $self.dataSource = data\n    },()=>{\n      $self.loading = false\n    })\n}, [$deps.input])\n",
                // 3、如果当前组件值大于aaa值，run: "$effect(() => {\n  console.log($deps.aaa, $self.value)\n  if ($self.value>$deps.aaa) {\n    $self.value = $deps.aaa\n  }\n}, [$deps.aaa, $self.value])\n",
                run?: string;
            }
        }

        type GroupType = | 'Collapse'

        type ComponentType =
            | 'DataSelector'
            | 'Input'
            | 'input'
            | 'InputNumber'
            | 'Select'
            | 'Switch'
            | 'RadioGroup'
            | 'CheckboxGroup'
            | 'DatePicker'
            | 'Slide'


        type Validator = {
            triggerType?: 'onInput' | 'onFocus' | 'onBlur' //校验触发类型
            format?: ValidatorFormats //内置校验规则
            // 自定义JS校验：value为当前控件值、rule规则列表、ctx上下文
            // 1、实例[-1,0) || (0,100]："{{(value)=>{\n  return (value>=-1 && value<0)||(value>0 && value<=100)\n}}}"
            // 2、实例[-1,0) || (0,组件A结果]："{{(value,rule,ctx)=>{\n  return (value>=-1 && value<0)||(value>0 && value<=ctx.form.values.组件A名称)\n}}}"
            validator?: (value: any, rule: IValidatorRules<Context>, ctx: Context) => boolean
            required?: boolean //必填
            pattern?: RegExp | string //正则匹配
            maximum?: number //最大值（大于）
            exclusiveMaximum?: number //最大值（大于等于）
            exclusiveMinimum?: number //最小值（小于等于）
            minimum?: number //最小值（小于）
            max?: number //最大长度
            min?: number //最小长度
            len?: number //长度匹配
            whitespace?: boolean //排除纯空白字符
            enum?: any[] //是否包含在枚举列表中
            const?: any //校验字段值是否与 const 的值相等
            multipleOf?: number //校验字段值是否可被 multipleOf 的值整除
            uniqueItems?: boolean //是否校验重复
            maxProperties?: number //最大属性数量
            minProperties?: number //最小属性数量
            maxItems?: number //最大条目数
            minItems?: number //校验最小长度
            message?: string; //错误信息
        }

        type ValidatorFormats =
            | 'url'
            | 'email'
            | 'ipv6'
            | 'ipv4'
            | 'number'
            | 'integer'
            | 'idcard'
            | 'qq'
            | 'phone'
            | 'money'
            | 'zh'
            | 'date'
            | 'zip'

        type RunResult = {
            status: 'wait' | 'process' | 'finish' | 'error',
            success?: boolean,
            message?: any[]
        }
    }
}
