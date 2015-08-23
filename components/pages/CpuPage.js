import React from 'react';
import { Table, striped, bordered, condensed, hover } from 'react-bootstrap';
import ProccessManager from 'current-processes';
import _ from 'lodash';

const CpuPage = React.createClass({
    getInitialState() {
        return {
            processes: []
        };
    },

    componentDidMount() {
        ProccessManager.get(function (err, processes) {
            processes = _.sortBy(processes, 'cpu');
            processes  = processes.reverse().splice(0, 100);

            if (this.isMounted()) {
                this.setState({processes: processes});
            }
        }.bind(this));
    },

    render() {
        var processes = this.state.processes;
        if (processes.length == 0) {
            return <div>Fetching...</div>;
        }

        return (
            <div className="page">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>CPU</th>
                    </tr>
                    </thead>
                    <tbody>
                    {processes.map(this.printRow)}
                    </tbody>
                </Table>
            </div>
        );
    },

    /**
     * Print table row
     */
    printRow(process) {
        return (
            <tr>
                <td>{process.pid}</td>
                <td>{process.name}</td>
                <td>{process.cpu}</td>
            </tr>
        );
    }
});

export default CpuPage;