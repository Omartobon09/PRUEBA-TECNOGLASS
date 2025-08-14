import React from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import { FaList, FaCheck, FaClock } from 'react-icons/fa';

const TaskFilters = ({ 
  currentFilter, 
  onFilterChange, 
  totalTasks, 
  completedTasks, 
  pendingTasks 
}) => {
  const filters = [
    {
      key: 'all',
      label: 'Todas',
      icon: FaList,
      count: totalTasks,
      variant: 'outline-primary',
      activeVariant: 'primary'
    },
    {
      key: 'pending',
      label: 'Pendientes',
      icon: FaClock,
      count: pendingTasks,
      variant: 'outline-warning',
      activeVariant: 'warning'
    },
    {
      key: 'completed',
      label: 'Completadas',
      icon: FaCheck,
      count: completedTasks,
      variant: 'outline-success',
      activeVariant: 'success'
    }
  ];

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body className="py-3">
        <div className="d-flex justify-content-center">
          <ButtonGroup className="task-filter-buttons">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              const isActive = currentFilter === filter.key;
              
              return (
                <Button
                  key={filter.key}
                  variant={isActive ? filter.activeVariant : filter.variant}
                  onClick={() => onFilterChange(filter.key)}
                  className={`px-4 py-2 d-flex align-items-center ${isActive ? 'active' : ''}`}
                  size="sm"
                >
                  <IconComponent className="me-2" size={14} />
                  <span className="me-2">{filter.label}</span>
                  <span className="badge-count">
                    {filter.count}
                  </span>
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskFilters;