/** @jsx jsx */
import { useMemo, useState } from 'react';
import { Box, Flex, Text, Close, jsx } from 'theme-ui';
import { ListboxInput, ListboxButton, ListboxPopover, ListboxList, ListboxOption } from '@reach/listbox';
import { Icon } from '@makerdao/dai-ui-icons';
import map from 'lodash/map';
import omitBy from 'lodash/omitBy';

import { getNumberWithOrdinal } from '../../lib/utils';
import Poll from '../../types/poll';
import Stack from '../layouts/Stack';

type RankedChoiceSelectProps = {
  poll: Poll;
  choice: number[] | null;
  setChoice: (choices: number[]) => void;
};

export default function RankedChoiceSelect({
  poll,
  setChoice,
  choice: _choice,
  ...props
}: RankedChoiceSelectProps): JSX.Element {
  const choice = _choice || [];
  const [numConfirmed, setNumConfirmed] = useState(choice.length > 0 ? choice.length - 1 : 0);
  const totalNumOptions = Object.keys(poll.options).length;
  const canAddOption = totalNumOptions > numConfirmed + 1;

  const availableChoices = useMemo(
    () =>
      omitBy(
        poll.options,
        (_, optionId) =>
          choice.findIndex(_choice => _choice === parseInt(optionId)) > -1 &&
          parseInt(optionId) !== choice[numConfirmed]
      ),
    [numConfirmed]
  );
  console.log('availableChoices', availableChoices);
  console.log('numConfirmed:', numConfirmed);
  console.log('Object.keys(availableChoices)', Object.keys(availableChoices).length);
  return (
    <Box {...props}>
      <Stack gap={2}>
        {Array.from({ length: numConfirmed }).map((_, index) => (
          <Flex sx={{ backgroundColor: 'background', py: 2, px: 3 }} key={index}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Text sx={{ variant: 'text.caps', fontSize: 1 }}>{getNumberWithOrdinal(index + 1)} choice</Text>
              <Text>{poll.options[choice[index]]}</Text>
            </Flex>
            <Close
              ml="auto"
              my="auto"
              sx={{ '> svg': { size: [3] } }}
              onClick={() => {
                const newChoice = [...choice];
                newChoice.splice(index, 1);
                setNumConfirmed(numConfirmed - 1);
                setChoice(newChoice);
              }}
            />
          </Flex>
        ))}
        <ListboxInput
          defaultValue={choice[numConfirmed] ? choice[numConfirmed].toString() : 'default'}
          key={numConfirmed}
          onChange={value => {
            const newChoice = [...choice];
            newChoice[numConfirmed] = parseInt(value);
            setChoice(newChoice);
            if (canAddOption || Object.keys(availableChoices).length === 1) setNumConfirmed(numConfirmed + 1);
          }}
        >
          <ListboxButton
            sx={{ variant: 'listboxes.default.button', fontWeight: 400, py: [3, 2] }}
            arrow={<Icon name="chevron_down" size={2} />}
          />
          <ListboxPopover sx={{ variant: 'listboxes.default.popover' }}>
            <ListboxList sx={{ variant: 'listboxes.default.list' }}>
              <ListboxOption value="default" sx={{ display: 'none' }}>
                {getNumberWithOrdinal(numConfirmed + 1)} choice
              </ListboxOption>
              {map(availableChoices, (label, optionId) => (
                <ListboxOption key={optionId} value={optionId}>
                  {label}
                </ListboxOption>
              ))}
            </ListboxList>
          </ListboxPopover>
        </ListboxInput>
      </Stack>
    </Box>
  );
}
