
import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-downward';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';


const row = (
        item, 
        i,
        header, 
        startEditing, 
        handleDelete, 
        activeIndex, 
        handleChange,
        stopEditing
    ) => {
        const isEditing = activeIndex === i;

        return (
            <TableRow key={`row-${i}`} selectable={false} className="icons">
                {header.map((option, k) => 
                        <TableRowColumn key={`col-${k}`}>
                            {isEditing 
                                ? <TextField 
                                    name={option.prop}
                                    value={item[option.prop]}
                                    onChange={(e) => handleChange(e, option.prop, i)} /> 
                                : (
                                    item[option.prop]
                                    )}
                        </TableRowColumn>
                        )
                }
                <TableRowColumn>
                    {isEditing
                        ?
                        <CheckIcon onClick={() => stopEditing()} /> 
                        :
                        <EditIcon onClick={() => startEditing(i)} />
                    }
                </TableRowColumn>
                <TableRowColumn>
                    <DeleteIcon onClick={() => handleDelete(i)} />
                </TableRowColumn>
            </TableRow>
        )
    }

export default ({ 
    data, 
    header, 
    handleDelete, 
    activeIndex, 
    startEditing, 
    handleChange, 
    stopEditing,
    sortColumn,
    sortType,
    sortedColumn
}) => 
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((item, i) => 
            <TableHeaderColumn key={`hclm-${i}`}>
                <div onClick={() => sortColumn(item.prop)} className="sortArrowsBlock">
                    <span>{item.name}</span>
                    {sortedColumn === item.prop ? (
                        sortType === 'asc' ? <DownArrow /> : <UpArrow /> 
                    ) : null}
                </div>
            </TableHeaderColumn>
        )}
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
        {data.map((item, i) => 
            row(
                item, 
                i,
                header, 
                startEditing, 
                handleDelete, 
                activeIndex, 
                handleChange,
                stopEditing
            )
        )}
    </TableBody>
  </Table>