import React, { useState } from 'react';
import { Input, Button, Tag, Space, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TagSelect = ({ updateLabel }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [labelColor, setLabelColor] = useState('#ff0000'); // Default: Red

    const handleClose = removedTag => {
        const tags = selectedTags.filter(tag => tag !== removedTag);
        setSelectedTags(tags);
        updateLabel(tags)
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !selectedTags.includes(inputValue)) {
            let newArray = [...selectedTags, { label: inputValue, color: labelColor }];
            setSelectedTags([...selectedTags, { label: inputValue, color: labelColor }]);
            setInputValue('');
            setInputVisible(false);
            updateLabel(newArray)
        }
    };

    const handleColorChange = color => {
        setLabelColor(color);
        console.log(color)
    };

    const content = (
        <div className='p-2'>
            <Input
                type="text"
                size="small"
                style={{ width: '80%', marginRight: '8px' }}
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleInputConfirm}
            />
            <Button type="primary" size="small" onClick={handleInputConfirm}>
                Add
            </Button>
            <Popover
                trigger="click"
                content={
                    <input type="color" onChange={e => handleColorChange(e.target.value)} />
                }
            >
                <Button size="small" className='mt-3 w-100' style={{ borderRadius: "20px" }}>Pick Color</Button>
            </Popover>
        </div>
    );

    return (
        <div>
            <Space>
                {selectedTags.map(tag => (
                    <Tag
                        key={tag.label}
                        closable
                        onClose={() => handleClose(tag)}
                        color={tag.color}
                    >
                        {tag.label}
                    </Tag>
                ))}
                <Popover content={content} trigger="click">
                    <Tag>
                        <PlusOutlined /> New Label
                    </Tag>
                </Popover>
            </Space>
        </div>
    );
};

export default TagSelect;
