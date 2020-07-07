import React, { memo, useImperativeHandle, useRef, forwardRef } from 'react'
import {
  Form,
  Input,
  Button
} from 'antd';

const { Item } = Form

const BaseForm = (props, ref) => {

  const { 
    layout,
    labelCol,
    wrapperCol,
    initialValues
  } = props
  const formRef = useRef()
  const [form] = Form.useForm()

  const handleFormSubmit = (values) => {
    props.formSubmit && props.formSubmit(values)
  }

  const handleBtnClick = (type) => {
    props.handleBtnClick(type)
  }

  const initFormList = () => {
    const { formList } = props

    const formItemList = []

    formList.forEach((item) => {
      const {
        type,
        label,
        field,
        placeholder,
        inputType,
        text,
        rules,
        prefix,
        block,
        btnType,
        // initValue
      } = item

      switch (type) {
        case 'INPUT': 
          const INPUT = <Item
            key={field}
            label={label}
            name={field}
            rules={rules}
          >
            <Input 
              type={inputType} 
              placeholder={placeholder} 
              prefix={prefix}
            />
          </Item>
          formItemList.push(INPUT); break;
        case 'SUBMIT':
          const SUBMIT = <Item key={field}>
            <Button 
              type={btnType} 
              htmlType="submit" 
              block={block}
            >{text}</Button>
          </Item>
          formItemList.push(SUBMIT); break;
        case 'BUTTON':
          const BUTTON = <Item key={field}>
            <Button 
              type={btnType} 
              block={block}
              onClick={handleBtnClick.bind(this, field)}
            >{text}</Button>
          </Item>
          formItemList.push(BUTTON); break;
        default: break;
      }
    })

    return formItemList
  }

  useImperativeHandle(ref, () => {
    return {
      formFields () { return formRef.current.getFieldsValue() }
    }
  })

  return <Form
    ref={formRef}
    form={form}
    layout={ layout || 'inline' }
    labelCol={labelCol}
    wrapperCol={wrapperCol}
    onFinish={ handleFormSubmit }
    initialValues={initialValues}
  >
    { initFormList() }
  </Form>
}

export default memo(forwardRef(BaseForm))