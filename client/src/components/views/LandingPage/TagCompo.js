import React, { useState } from 'react'
import { Tag } from 'antd';
const { CheckableTag } = Tag;

function TagCompo(props) {
    const [checked, setchecked] = useState(props.initChecked);

    const handleChecked = checked => {
        setchecked(checked)
    };

    return (
            <CheckableTag {...props} checked={checked} onChange={handleChecked}>{props.name}</CheckableTag>
    )
}

export default TagCompo
